import React from 'react'
import '../styles/Header.css'

export default function Header() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo">lrnr</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="badges.html">Account</a></li>
        <li><a href="collapsible.html">Quiz Generation</a></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}
