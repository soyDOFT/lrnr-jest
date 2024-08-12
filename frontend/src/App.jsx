import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import M from 'materialize-css';
import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import Quiz from './pages/Quiz'
import Home from './pages/Home';
import Account from './pages/Account';
import QuizzForm from './pages/QuizzForm';

function App() {
  useEffect(() => {M.AutoInit();}, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/quizform" element={<QuizzForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
