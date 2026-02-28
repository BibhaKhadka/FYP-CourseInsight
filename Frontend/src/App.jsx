import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import About from './Pages/About';
import Quiz from './Pages/Quiz';
import Results from './Pages/Results';

// THE GUARD: Only allows access if 'isAuthenticated' is true
const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem('isAuthenticated');
  return auth === 'true' ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        
        {/* Protected Routes */}
        <Route path='/quiz' element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        
        <Route path='/result' element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } />

        {/* Catch-all: Redirects any typos to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;