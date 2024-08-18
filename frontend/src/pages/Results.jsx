import { Link } from 'react-router-dom'

export default function Results() {
  return (
    <div className="container center">
        <h2 className="teal-text">lrnr</h2>
        <h5>Questions Right: 0111</h5>
        <Link to="/quizforms" className="btn">Try Another Quiz</Link>
    </div>
  )
}
