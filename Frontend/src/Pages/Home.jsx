import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Navbar/Header';
import Footer from '../Components/Navbar/Footer';
import '../Pages/Home.css';
import clock from '../assets/photos/clock.png';
import chart from '../assets/photos/chart.png';
import circle from '../assets/photos/circle.png';
import board from '../assets/photos/board.png';
import brain from '../assets/photos/brain.png';
import trophy from '../assets/photos/trophy.png';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if (location.hash==='#how-it-works'){
            const section = document.getElementById('how-it-works');
            if(section){
                setTimeout(()=>{
                    section.scrollIntoView({behavior:'smooth'});
                }, 100);
            }
        }
    }, [location]);
    return (
        <div className='home-wrapper'>
            <Header />
            <section className='hero-section'>
                <h1>Discover Your Perfect <br /><span className='green-highlight'>Learning Path</span></h1>
                <p>Take our intelligent quiz assessment and receive personalized course recommendations tailored to your unique skills and learning goals. </p>
                <button className='start-btn' onClick={() => navigate('/quiz')}>Start Quiz</button>
                <div className="hero-info-bar">
                    <span><img src={clock} alt="icon" />5 minutes</span>
                    <span><img src={chart} alt="icon" />15 questions</span>
                    <span><img src={circle} alt="icon" />Personalized results</span>
                </div>
            </section>
            <section id="how-it-works" className='how-it-works'>
                <h2>How It Works</h2>
                <p className='section-desc'>Three simple steps to your personalized learning journey.</p>
                <div className="steps-grid">
                    <div className="step-card">
                        <img src={board} alt="Assessment" />
                        <h3>Take Assessment</h3>
                        <p>Answer 15 quick questions about your interests and skills.</p>
                    </div>
                    <div className="step-card active-step">
                        <img src={brain} alt="AI" />
                        <h3>AI Analysis</h3>
                        <p>Our intelligent system analyzes your responses to identify your strengths.</p>
                    </div>
                    <div className="step-card">
                        <img src={trophy} alt="Results" />
                        <h3>Get Results</h3>
                        <p>Receive personalized course recommendations matched to your profile.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home
