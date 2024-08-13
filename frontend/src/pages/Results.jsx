import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Results() {
  return (
    <>
    <Header/>
    <div className="container center">
        <h2 className="teal-text">lrnr</h2>
        <h5>Questions Right: 0111</h5>
        <Link to="/quizform" className="btn">Try Another Quiz</Link>
    </div>
    <Footer/>
    </>
  )
}
