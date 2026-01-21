import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import About from './Pages/About';
import Quiz from './Pages/Quiz'

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>

    </Router>
  );
}

export default App;
