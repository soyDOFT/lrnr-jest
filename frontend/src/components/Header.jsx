import '../styles/Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
        <a href="/" className="brand-logo">lrnr</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/quizforms">Quiz Generation</Link></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}
