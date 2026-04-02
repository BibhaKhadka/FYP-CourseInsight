import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Navbar/Header.css';
import logo from '../../assets/photos/Course.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    const handleHowItWorks = () => {
        if (location.pathname === '/') {
            const section = document.getElementById('how-it-works');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/#how-it-works');
        }
    };

    // New Logout function
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('user_recommendation'); // Clears old quiz results
        navigate('/'); // Redirect to home
        window.location.reload(); // Refresh to reset the UI state
    };

    return (
        <nav className='header-nav'>
            <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src={logo} alt='CourseInsight Logo' />
                <span className='header-title'>CourseInsight</span>
            </div>
            <div className="header-links">
                <span className='nav-link' onClick={() => navigate('/about')}>About</span>
                <span className="nav-link" onClick={handleHowItWorks}>How It Works</span>
                
                {/* DYNAMIC BUTTON SECTION */}
                {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="user-display" style={{ fontSize: '0.9rem', color: '#666' }}>
                            {userEmail}
                        </span>
                        <button className='header-signin-btn' onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className='header-signin-btn' onClick={() => navigate('/login')}>Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Header;