import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Quiz() {
    const location = useLocation();
    const quiz = location.state?.quiz || {
        level: 'beginner',
        style: 'Normal',
        questions: ['Why is the sky blue?' , 'Why is grass green?']
    };
    const [ questionIndex, setQuestionIndex ] = useState(0);
    const [ evaluationIndex, setEvaluationIndex ] = useState(0);
    const [ answers, setAnswers ] = useState([]);
    const [ responses, setResponses ] = useState([]);
    const [ isFinished, setIsFinished ] = useState(false);
    const [ isEvaluationFinished, setIsEvaluationFinished ] = useState(false);
    const finalQuestion = quiz.questions.length - 1;
    const navigate = useNavigate();

    const answerHandler = (e) => {
        answers[questionIndex] = e.target.value;
        setAnswers([ ...answers]);
    }
    const nextHandler = () => {
        if (!isFinished) setQuestionIndex(questionIndex + 1);

        if (questionIndex === finalQuestion) {
            setIsFinished(true);
            setQuestionIndex(0);
            getResponses();
        }
    }

    async function getResponses() {
        // const data = await fetch();
        const data = [
            'No this is wrong',
            'Yes this is correct dfnsajuifhbsadfjkuhda sfjhsjadf jdsahf'
        ];
        
        setQuestionIndex(0);
        setResponses(() => data);

        console.log(data);
        console.log(responses);
        console.log(responses[questionIndex]);
    }

    const nextEvaluationHandler = () => {
        if (!isEvaluationFinished) {
            setQuestionIndex(questionIndex + 1);
            setEvaluationIndex(evaluationIndex + 1);
        } else {
            navigate("/results");
        }

        if (evaluationIndex === finalQuestion - 1) setIsEvaluationFinished(true);
    }

  return (
    <>
        <Header/>
        <div className='container'>
            {!isFinished ?
            <>
                <h2 className="center teal-text">{questionIndex + 1} of {finalQuestion + 1}</h2>
                <h3 className="teal-text">Question</h3>
                <p className="mb-6 pb-6">{quiz.questions[questionIndex]}</p>
                <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
                <form className="input-field col s12">
                    <input type='text' id='response' name='response' 
                        value={answers[questionIndex] || ""} onChange={answerHandler}>
                    </input>
                    <label htmlFor='response'>Answer</label>
                </form>
                <button className="btn" onClick={nextHandler}>SUBMIT ANSWER</button>
            </>
            :<>
                <h2 className="center teal-text">{questionIndex + 1} of {finalQuestion + 1}</h2>
                    <h3 className="teal-text">Question</h3>
                    <p className="mb-6 pb-6">{quiz.questions[questionIndex]}</p>
                    <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
                    <form className="input-field col s12">
                        <input type='text' id='response' name='response' readOnly color="black"
                            value={answers[questionIndex] || ""} onChange={answerHandler}>
                        </input>
                        <label htmlFor='response'>Answer</label>
                    </form>
                    <button className="btn">SUBMIT ANSWER</button>
                <div>
                    <h3 className="teal-text">{quiz.style}&apos;s Evaluation</h3>
                    <p>{responses[evaluationIndex].substring(0,2).toLowerCase() !== 'no' ? 'Correct' : 'Incorrect'}</p>
                    <p>{responses[evaluationIndex]}</p>
                    <button className="btn" onClick={nextEvaluationHandler}>NEXT</button>
                </div>
            </>}
        </div>
        <Footer/>
    </>
  )
}
