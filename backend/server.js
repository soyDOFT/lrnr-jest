const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const OpenAI = require('openai');
const client = new OpenAI({apiKey: process.env.OPENAI_KEY})

const app = express();
const router = express.Router();
app.use('/api', router);

const PORT = process.env.PORT || 8000;

app.get('/quiz', async (req, res) => {
    const { topic, level, questionNum, style } = req.query;

    const chatCompletion = chatGPT(
    [{
        role: "system",
        content: `
        Create a ${questionNum} question quiz in the style of ${style}
        and in a difficulty level of ${level} regarding ${topic} following
        the format shown below inside the elipses.

        ...
        1. Generated question 1.
        2. Generated question 2.
        n. Generated question n.
        ...

        Ensure it is obvious that you are ${style} and that a(n) ${level} could answer the question.
        `
    }]);

    res.json(chatCompletion.choices[0].message.content)
})

app.get('/results', async (req, res) => {
    const { question, style, level } = req.query;
    let chatCompletion = {};
    try {
        chatCompletion = await chatGPT(
        [{  role: "system",
            content: `
            Grade the response to the question '${question}' in the style of ${style}
            and expect the response to be of a(n) ${level}. 
            Follow the format shown below inside the elipses.
            Start with either saying 'Yes' if it's correct or 'No' if it's incorrect.
            Then include a detailed paragraph explaining why it is correct or incorrect.   
            
            ...
            (Yes or No) (Explanation). 
            ...
            
            Ensure it is obvious that you are ${style} and that the question is graded according to a(n) ${level}.
            `},
        { role:"user", content: "Evaluate the response."}
        ]);
    } catch (err) {
        console.log(err, 'Error: Invalid response');
    }
    
    const result = chatCompletion.choices[0].message.content;

    if (result.substring(0,3).toLowerCase() === "yes") res.json({ verdict: "Correct", explanation: result});
    else res.json({ verdict: "Incorrect", explanation: result});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
});

async function chatGPT(prompt) {
    return await client.chat.completions.create({
        model: 'gpt-4',
        messages: prompt,
        stream: true,
        temperature: 1,
        response_format: { type: "text" }
    });
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));