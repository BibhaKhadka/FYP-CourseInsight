import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Navbar/Header.css';
import logo from '../../assets/photos/Course.png';

const Header = () => {
    const navigate = useNavigate();
    return (
        <nav className='header-nav'>
            <div className="header-logo" onClick={() => navigate('/')}>
                <img src={logo} alt='CourseInsight Logo' />
                <span className='header-title'>CourseInsight</span>

            </div>
            <div className="header-links">
                <a href='#about'>About</a>
                <a href='#how-it-works'>How It Works</a>
                <button className='header-signin-btn' onClick={() => navigate('/login')}>Sign In</button>
            </div>
        </nav>



    )
}

export default Header
