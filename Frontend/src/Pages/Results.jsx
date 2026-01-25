import React from 'react';
import Header from '../Components/Navbar/Header';
import Footer from '../Components/Navbar/Footer';
import './Results.css';

const Results = () => {
    return (
        <div className="results-page">
            <Header />
            <div className="results-container">
                <div className="results-header-card">
                    <div className="logo-section">
                        <span className="cap-icon">🎓</span>
                        <span className="brand-name">CourseInsight</span>
                    </div>
                    <h1>Your Results Are Ready!</h1>
                    <p>Based on your responses, we've identified your strengths and matched you with the perfect course.</p>
                </div>

                <div className="results-main-content">
                    {/* Left Side: Best Match */}
                    <div className="best-match-card">
                        <div className="match-header">
                            <span className="match-badge">⭐ Best Match</span>
                            <div className="percentage-circle">
                                <span className="percent">60%</span>
                                <span className="label">Match</span>
                            </div>
                        </div>
                        
                        <div className="course-details">
                            <h3>Full-Stack Web Development</h3>
                            <p className="course-subtitle">Master modern web development with React</p>
                            
                            <div className="why-section">
                                <h4>Why This Course?</h4>
                                <ul>
                                    <li>Matches your strong problem-solving and logical thinking skills.</li>
                                    <li>Aligns with your interest in technology and building things.</li>
                                    <li>Suitable for your preferred learning pace and style.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Recommendations */}
                    <div className="other-recommendations">
                        <h4>Other Recommended Courses</h4>
                        <div className="mini-card">
                            <div className="phone-icon">📱</div>
                            <p>Mobile App Development<br /><span>iOS & Android with React Native</span></p>
                        </div>
                    </div>
                </div>
                
                <div className="action-footer">
                    <button className="retake-btn" onClick={() => window.location.href='/quiz'}>Retake Quiz</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Results;