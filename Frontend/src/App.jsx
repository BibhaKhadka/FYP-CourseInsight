import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import About from './Pages/About';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
      </Routes>

    </Router>
  );
}

export default App;
