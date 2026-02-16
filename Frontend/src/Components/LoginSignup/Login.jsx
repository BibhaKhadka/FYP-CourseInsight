import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    // Renamed to formData for professionalism
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // FIXED: Changed http; to http:
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.text();

            // .trim() handles any hidden spaces from the Java backend
            if (response.ok && result.trim() === 'Login successful!') {
                navigate('/quiz');
            } else {
                // If result is empty, show the "Invalid" message
                alert(result || "Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Connection Failed: Make sure your Java Backend is running on port 8080.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome</h2>
                <p>Sign in to continue your quiz assessment</p>
                <div className="auth-tabs">
                    <span className='tab active'>Sign In</span>
                    <span className='tab' onClick={() => navigate('/signup')}>Sign Up</span>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type='email' 
                            placeholder='yourmail@gmail.com' 
                            required 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type='password' 
                            placeholder='........' 
                            required 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        />
                    </div>
                    <button type='submit' className='btn-primary'>Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;