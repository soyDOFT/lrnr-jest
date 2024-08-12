import { useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Quiz() {
    const location = useLocation();
    const quiz = location.state?.quiz || ['Why is the sky blue?' , 'Why is grass green?'];
    const [ index, setIndex ] = useState(0);
    const [ answers, setAnswers ] = useState([]);
    const finalQuestion = quiz.length - 1;

    const answerHandler = (e) => {
        answers[index] = e.target.value;
        setAnswers([ ...answers]);
    }
    const nextHandler = () => {if (index < finalQuestion) setIndex(index + 1);}

  return (
    <div className='container'>
        {index < finalQuestion ? (
        <>
            <h2 className="center teal-text">{index + 1} of {quiz.length}</h2>
            <h3 className="teal-text">Question</h3>
            <p className="mb-6 pb-6">{quiz[index]}</p>
            <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
            <form className="input-field col s12">
                <input className="active" type='text' id='response' name='response' 
                    value={answers[index] || ""} onChange={answerHandler}>
                </input>
                <label htmlFor='response'>Your Answer</label>
            </form>
            <button className="btn" onClick={nextHandler}>SUBMIT ANSWER</button>
        </>)
        : <h3>Finished!</h3>}
    </div>
  )
}
