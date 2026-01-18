import React from "react"
import Footer from "../Components/Navbar/Footer"
import Header from "../Components/Navbar/Header"
import '../Pages/About.css'
import mission from '../assets/photos/mission.png'
import ml from '../assets/photos/ml.png'

const About = () => {
    return (
        <div className="about-page-container">
            <Header />
            <div className="about-content-wrapper">
                <section className="about-hero">
                    <h1>About <span className="green-text">CourseInsight</span></h1>
                    <p>(Bridging the gap between academic learning and professional success through AI-driven insights.)</p>
                </section>
                <section className="about-content">
                    <div className="about-row">
                        <div className="about-image">
                                <img src={mission} alt="Our Mission"></img>
                            </div>
                        <div className="about-text">
                            <h2>Our Mission</h2>
                            <p>CourseInsight was developed as a Final Year Project to solve a common problem: students often feel lost when choosing a career path.
                                Our platform uses techincal and behavioral diagnostics to provide data-backed recommendations.
                            </p>

                            
                        </div>
                    </div>
                    <div className="about-row reverse">
                        <div className="about-image">
                            <img src={ml} alt="AI Technology" />
                        </div>
                        <div className="about-text">
                            <h2>How the AI works</h2>
                            <p>
                                We utilize a Machine Learning model trained on the dataset.
                                By analyzing your performance across 15 specific parameters-including logical reasoning, coding skills, and management abilities-our system predicts the most suitable IT role for your profile.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>

    )
}
export default About;