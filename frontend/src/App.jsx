import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import Quiz from './pages/Quiz'
import Home from './pages/Home';
import Account from './pages/Account';
import QuizzForms from './pages/QuizzForms';
import Results from './pages/Results';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  useEffect(() => { M.AutoInit(); }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/account" element={<Account />} />
        <Route path="/quizforms" element={<QuizzForms />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App