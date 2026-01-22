import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Navbar/Header.css';
import logo from '../../assets/photos/Course.png';

const Header = () => {
    const navigate = useNavigate();
    const location =useLocation();
    const handleHowItWorks=()=>{
        if(location.pathname==='/'){
            const section = document.getElementById('how-it-works');
            if(section){
                section.scrollIntoView({behavior:'smooth'});
            }
        }else{
                navigate('/#how-it-works');
            }
    }
    
    return (
        <nav className='header-nav'>
            <div className="header-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
                <img src={logo} alt='CourseInsight Logo' />
                <span className='header-title'>CourseInsight</span>

            </div>
            <div className="header-links">
                <span className='nav-link' onClick={()=> navigate('/about')}>About</span>
                <span className="nav-link" onClick={handleHowItWorks}>How It Works</span>
                <button className='header-signin-btn' onClick={() => navigate('/login')}>Sign In</button>
            </div>
        </nav>



    )
}

export default Header
