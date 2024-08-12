import { useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Quiz() {
    const location = useLocation();
    const quiz = location.state?.quiz || {
        level: 'beginner',
        style: 'normal',
        questions: ['Why is the sky blue?' , 'Why is grass green?']
    };
    const [ index, setIndex ] = useState(0);
    const [ answers, setAnswers ] = useState([]);
    const finalQuestion = quiz.questions.length - 1;
    const [ responses, setResponses ] = useState(['fdsafdsaff', 'fdasfdsafasf']);
    const [ isFinished, setIsFinished ] = useState(false);

    const answerHandler = (e) => {
        answers[index] = e.target.value;
        setAnswers([ ...answers]);
    }
    const nextHandler = () => {
        if (!isFinished) setIndex(index + 1);
        else getResponses();

        if (index === finalQuestion - 1) {
            setIsFinished(true);
        }
    }

    async function getResponses() {
        // const data = await fetch();
        const data = [
            'No this is wrong',
            'Yes this is correct dfnsajuifhbsadfjkuhda sfjhsjadf jdsahf'
        ];
        
        setIndex(0);
        setResponses(() => data);

        console.log(data);
        console.log(responses);
        console.log(responses[index]);
    }

  return (
    <div className='container'>
        {!isFinished ?
        <>
            <h2 className="center teal-text">{index + 1} of {finalQuestion + 1}</h2>
            <h3 className="teal-text">Question</h3>
            <p className="mb-6 pb-6">{quiz.questions[index]}</p>
            <h3 className="mt-6 pt-6 teal-text">Your Answer</h3>
            <form className="input-field col s12">
                <input type='text' id='response' name='response' 
                    value={answers[index] || ""} onChange={answerHandler}>
                </input>
                <label htmlFor='response'>Answer</label>
            </form>
            <button className="btn" onClick={nextHandler}>SUBMIT ANSWER</button>
        </>
        :
        <div>
            <h3>{quiz.style}&apos;s Evaluation</h3>
            <p>{responses[index].substring(0,3).toLowerCase() !== 'no' ? 'Correct' : 'Incorrect'}</p>
            <p>{responses[index]}</p>
        </div>}
    </div>
  )
}
