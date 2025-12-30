import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Signup() {
    const [fromData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await
                fetch('http://localhost:8080/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(fromData)
                });
            const message = await
                response.text();
            alert(message);
            if (response.ok)
                navigate('/login');
        }
        catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome</h2>
                <p>Sign up to continue your quiz assessment</p>
                <div className="auth-tabs">
                    <span className='tab' onClick={() => navigate('/login')}>Sign In</span>
                    <span className='tab active'>Sign Up</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type='text' placeholder='Your Name' required onChange={(e) => setFormData({ ...fromData, name: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type='email' placeholder='yourmail@gmail.com' required onChange={(e) => setFormData({ ...fromData, email: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type='password' placeholder='........' required onChange={(e) => setFormData({ ...fromData, password: e.target.value })} />
                    </div>
                    <button type='submit' className='btn-primary'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
