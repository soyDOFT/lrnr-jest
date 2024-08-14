const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const client = new OpenAI({apiKey: process.env.OPENAI_KEY || 'test'})

const app = express();
const router = express.Router();
app.use('/api', router);
app.use(express.static(path.join(__dirname, '/dist')));
app.use(cors());

const PORT = process.env.PORT || 8000;

router.post('/quiz', async (req, res) => {
    const { topic, level, questionNum, style } = req.query;
    try {
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
            console.log(chatCompletion);
            console.log('OUTSIDE');
            res.json(chatCompletion.choices[0].message.content)
    } catch (err) {
        console.log(err, 'Error: Invalid response');
        res.json({
            "id": "chatcmpl-abc123",
            "object": "chat.completion",
            "created": 1677858242,
            "model": "gpt-4o-mini",
            "usage": {
                "prompt_tokens": 13,
                "completion_tokens": 7,
                "total_tokens": 20
            },
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": "\n\nThis is a test!"
                    },
                    "logprobs": null,
                    "finish_reason": "stop",
                    "index": 0
                }
            ]
        })
    }
})

router.post('/results', async (req, res) => {
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
    res.json(result);
})

app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
    console.log('*')
    res.send('hurr');
});

async function chatGPT(prompt) {
    return await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: prompt,
        stream: true,
        temperature: 1,
        response_format: { type: "text" }
    });
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));