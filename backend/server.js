const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const client = new OpenAI({apiKey: process.env.OPENAI_KEY || 'test'})

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '/dist')));

const PORT = process.env.PORT || 8000;

router.post('/quiz', async (req, res) => {
    const { topic, level, questionNum, style } = req.body;
    console.log(req.body);
    try {
        const chatCompletion = chatGPT(
            [{
                role: "system",
                content: `
                Create a ${questionNum} question quiz in the style of ${style}
                and in a difficulty level of ${level} regarding ${topic} following
                the format shown below inside the ellipses.
                
                ...
                    ['Generated question 1',
                    'Generated question 2',
                    'Generated question 3',
                    'Generated question n']
                ...
                
                Ensure it is obvious that you are ${style} and that a(n) ${level} could answer the question.
                Your response should not consist of any other words.
                `
            }]);
            console.log(chatCompletion.choices[0].message.content);
            console.log('OUTSIDE');
            res.json({
                level,
                style,
                questions: chatCompletion.choices[0].message.content
            })
    } catch (err) {
        console.log(err, 'Error: Invalid response');
        res.json({
            content: "\n\nThis is a test!",
            level,
            style,
            questions: ['Why is the sky greeen?', 'Why is grass blue?']
        })
    }
})

router.post('/results', async (req, res) => {
    const { questions, style, level } = req.body;
    let chatCompletion = {};
    try {
        chatCompletion = await chatGPT(
        [{  role: "system",
            content: `
            Grade the response to the questions '${questions}' in the style of ${style}
            and grade the response according to the level of a(n) ${level}.
            Grade the response as correct if it is at least half-way correct.
            Follow the format shown below inside the ellipses.
            Start with either saying 'Yes' if it's correct or 'No' if it's incorrect inside double quotes.
            Then include a detailed paragraph explaining why it is correct or incorrect.
            Do not include double quotes in the paragraph.
            Follow the array format shown below inside the ellipses. 
            
            Here are the responses:
            ${answers}

            ...
            ['Yes/No Explanation 1',] 
            'Yes/No Explanation 2',] 
            'Yes/No Explanation 3',] 
            'Yes/No Explanation n'] 
            ...
            
            Ensure it is obvious that you are ${style} and that the question is graded according to a(n) ${level}.
            Include at least one reference to pop culture that ensures it is obvious to the reader that you are ${level}.

            Include no other words.
            `},
        { role:"user", content: "Evaluate the response."}
    ]);
        const result = chatCompletion.choices[0].message.content;
        res.json(result);
    } catch (err) {
        console.log(err, 'Error: Invalid response');
        res.json([
            'Yes ffdsfsf this is wrong',
            'No dasda this is correct dfnsajuifhbsadfjkuhda sfjhsjadf jdsahf'
        ]);
    }
})

// app.get('*', (req, res) => {
//     // res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
//     console.log('*')
//     res.status(404).send('Error 404: Page Not Found');
// });

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