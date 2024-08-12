import { useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Quiz() {
    const location = useLocation();
    const quiz = location.state?.quiz || ['Why is the sky blue?' , 'Why is grass green?'];
    const [ index, setIndex ] = useState(0);
    const [ answers, setAnswers ] = useState({});
    const finalQuestion = quiz.length - 1;

    const answerHandler = (e) => setAnswers({ ...answers, [index]: e.target.value});
    const nextHandler = () => {if (index < finalQuestion) setIndex(index + 1);}

  return (
    <div className='container'>
        <div>LOADED</div>
        {index < finalQuestion ? (
        <>
            <h1>{index + 1} of {quiz.length}</h1>
            <h3>Question</h3>
            <p>{quiz[index]}</p>
            <input type='text' id='response' name='response' value={answers[index]} onChange={answerHandler}></input>
            <label htmlFor='response'>Your Answer</label>
            <button onClick={nextHandler}>NEXT</button>
        </>)
        : <h3>Finished!</h3>}
    </div>
  )
}
