import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [fromData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await
            fetch('http;//localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fromData)
            });
        const result = await response.text();
        if (result === 'Login successful!') {
            navigate('/quiz');
        }
        else {
            alert(result);
        }
    };
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome</h2>
                <p>Sign in to continue your quiz assessment</p>
                <div className="auth-tabs">
                    <span className='tab active'>Sign In</span>
                    <span className='tab ' onClick={() => navigate('/signup')}>Sign Up</span>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type='email' placeholder='"yourmail@gmail.com' required onChange={(e) => setFormData({ ...fromData, email: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type='password' placeholder='........' required onChange={(e) => setFormData({ ...fromData, password: e.target.value })} />
                    </div>
                    <button type='submit' className='btn-primary'>Sign In</button>

                </form>
            </div>
        </div>
    );
}

export default Login;
