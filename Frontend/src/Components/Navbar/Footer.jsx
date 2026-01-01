import React from 'react';
import '../Navbar/Footer.css';
import logo from '../../assets/photos/Course.png';
const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="logo" />
                    <span>CourseInsight</span>
                </div>
                <p className='copyright'>@2025 CourseInsight. All rights reserved.</p>
            </div>

        </footer>
    )
}

export default Footer
