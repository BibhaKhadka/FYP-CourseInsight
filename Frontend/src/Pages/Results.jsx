import React, { useState, useEffect } from 'react';
import Header from '../Components/Navbar/Header';
import Footer from '../Components/Navbar/Footer';
import './Results.css';

const Results = () => {
    const [recommendation, setRecommendation] = useState(null);

    useEffect(() => {
        // Get the AI result we saved in the Quiz page
        const savedData = localStorage.getItem('user_recommendation');
        if (savedData) {
            setRecommendation(JSON.parse(savedData));
        }
    }, []);

    // If no data is found yet, show a simple loading message
    if (!recommendation) {
        return <div className="loading">Calculating your best match...</div>;
    }

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
                    <p>Based on Cluster {recommendation.cluster}, we've identified your perfect career path.</p>
                </div>

                <div className="results-main-content">
                    {/* Left Side: Best Match (The first course in the AI list) */}
                    <div className="best-match-card">
                        <div className="match-header">
                            <span className="match-badge">⭐ Best Match</span>
                            <div className="percentage-circle">
                                <span className="percent">AI</span>
                                <span className="label">Match</span>
                            </div>
                        </div>
                        
                        <div className="course-details">
                            <h3>{recommendation.courses[0]}</h3>
                            <p className="course-subtitle">Our top recommendation based on your skills</p>
                            
                            <div className="why-section">
                                <h4>Why This Course?</h4>
                                <ul>
                                    <li>Matches your technical aptitude and academic background.</li>
                                    <li>Aligns with your preferences for {recommendation.courses[0]}.</li>
                                    <li>Calculated using K-Means Clustering for accuracy.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Other Recommendations (The rest of the list) */}
                    <div className="other-recommendations">
                        <h4>Other Recommended Courses</h4>
                        {recommendation.courses.slice(1).map((course, index) => (
                            <div className="mini-card" key={index}>
                                <div className="phone-icon">📚</div>
                                <p>{course}<br /><span>Specialization Track</span></p>
                            </div>
                        ))}
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