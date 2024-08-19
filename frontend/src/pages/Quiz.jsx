import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Quiz() {
    const location = useLocation();
    const { responseData } = location.state || {
        level: 'beginner',
        style: 'Normal',
        questions: ['Why is the sky blue?', 'Why is grass green?']
    };
    const [questionIndex, setQuestionIndex] = useState(0);
    const [evaluationIndex, setEvaluationIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isEvaluationFinished, setIsEvaluationFinished] = useState(false);
    const finalQuestion = responseData.questions.length - 1;
    const navigate = useNavigate();

    const answerHandler = (e) => {
        answers[questionIndex] = e.target.value;
        setAnswers([...answers]);
    }
    const nextHandler = (e) => {
        e.preventDefault();
        if (!isFinished) setQuestionIndex(questionIndex + 1);

        if (questionIndex === finalQuestion) {
            setIsFinished(true);
            document.getElementById('msg').innerHTML = 'Loading...';
            document.getElementById('quiz').style.display = 'none';
        }
    }

    const nextEvaluationHandler = (e) => {
        e.preventDefault();
        if (!isEvaluationFinished) {
            setEvaluationIndex(evaluationIndex + 1);
        } else {
            navigate("/results");
        }

        if (evaluationIndex === finalQuestion - 1) setIsEvaluationFinished(true);
    }

    useEffect(() => {
        async function getResponses() {
            try {
                const { formData } = location.state || {};
                const response = await fetch('/api/results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...formData, questions: responseData.questions, answers}), // Sending form data in JSON format
                });
                    
                if (!response.ok) { // Check if the response is not OK
                    console.error(`HTTP error! Status: ${response.status}`);
                    throw new Error('Failed to submit form data');
                }
                    
                const results = await response.json();
                setResponses(results);
                console.log('results', results);
            } catch (err) {
                console.error('Error fetching question evaluations', err)
            }
        }

        if (isFinished) {
            getResponses();
        }
    }, [isFinished]);

    return (
            <div className='container'>
                {!responses.length ?
                    <>
                        <div id='quiz'>
                            <h2 className="center teal-text">{questionIndex + 1} of {finalQuestion + 1}</h2>
                            <h3 className="teal-text">Question</h3>
                            <p className="mb-6 pb-6">{responseData.questions[questionIndex]}</p>
                            <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
                            <form onSubmit={nextHandler} className="input-field col s12">
                                <input type='text' id='response' name='response'
                                    value={answers[questionIndex] || ""} onChange={answerHandler}>
                                </input>
                                <label htmlFor='response'>Answer</label>
                                <button style={{margin: '0 0 50px'}} className="btn">SUBMIT ANSWER</button>
                            </form>
                        </div>
                        <p id="msg"></p>
                    </>
                    : <>
                        <h2 className="center teal-text">{evaluationIndex + 1} of {finalQuestion + 1}</h2>
                        <h3 className="teal-text">Question</h3>
                        <p className="mb-6 pb-6">{responseData.questions[evaluationIndex]}</p>
                        <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
                        <form className="input-field col s12">
                            <input type='text' id='response' name='response' readOnly color="black"
                                value={answers[evaluationIndex] || ""} onChange={answerHandler}>
                            </input>
                        </form>
                        <button className="btn">SUBMIT ANSWER</button>
                        <form onSubmit={nextEvaluationHandler}>
                            <h3 className="teal-text">{responseData.style}&apos;s Evaluation</h3>
                            <div className='row'>
                                <p className="col s6">{responses?.[evaluationIndex].substring(0, 2).toLowerCase() !== 'no' ? 'Correct' : 'Incorrect'}</p>
                                <p className="col s6">{responses?.[evaluationIndex]}</p>
                            </div>
                            <button style={{margin: '0 0 50px'}} className="btn">NEXT</button>
                        </form>
                    </>
                }
            </div>
    )
}
