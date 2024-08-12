import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import Quiz from './pages/Quiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={}></Route> */}
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
