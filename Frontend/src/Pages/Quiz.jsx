import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Navbar/Header';
import Footer from '../Components/Navbar/Footer';
import '../Pages/Quiz.css';

// 1. Matches your FEATURE_COLUMNS exactly for the AI
const questions = [
    { id: 1, key: "Acedamic percentage in Operating Systems", question: "How comfortable are you with Operating Systems and kernel concepts?", type: "likert" },
    { id: 2, key: "percentage in Algorithms", question: "Do you enjoy solving complex data structures and algorithm problems?", type: "likert" },
    { id: 3, key: "Percentage in Programming Concepts", question: "How confident are you in core programming fundamentals like OOPs?", type: "likert" },
    { id: 4, key: "Percentage in Software Engineering", question: "Do you enjoy software design, documentation, and lifecycle management?", type: "likert" },
    { id: 5, key: "Percentage in Communication skills", question: "Can you effectively convey your ideas through verbal and written means?", type: "likert" },
    { id: 6, key: "Percentage in Computer Networks", question: "Are you interested in how data travels across networks and security protocols?", type: "likert" },
    { id: 7, key: "Percentage in Mathematics", question: "Do you enjoy solving mathematical problems and applying logic?", type: "likert" },
    { id: 8, key: "Logical quotient rating", question: "Do you consider yourself a logical thinker when faced with abstract puzzles?", type: "likert" },
    { id: 9, key: "hackathons", question: "Do you enjoy participating in competitive coding events or group hackathons?", type: "likert" },
    { id: 10, key: "coding skills rating", question: "How would you rate your proficiency in a high-level language like Python or Java?", type: "likert" },
    { id: 11, key: "public speaking points", question: "Are you comfortable presenting your work or speaking in front of an audience?", type: "likert" },
    { id: 12, key: "Extra-courses did", question: "Do you frequently take online certifications outside your college syllabus?", type: "likert" },
    { id: 13, key: "reading and writing skills", question: "Do you enjoy researching technical topics and writing detailed reports?", type: "likert" },
    { id: 14, key: "Management or Technical", question: "What do you prefer: Managing people or focusing on technical tasks?", type: "choice", options: ["Management", "Technical"] },
    { id: 15, key: "Salary/work", question: "What is more important to you: A high salary or the type of work you do?", type: "choice", options: ["Salary", "Work"] }
];

const Quiz = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({}); // Stores all answers

    const handleOptionChange = (value) => {
        setAnswers({ ...answers, [questions[currentStep].key]: value });
    };

    const handleNext = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // --- FINAL SUBMISSION TO AI ---
            try {
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(answers),
                });
                if (!response.ok) {
                    throw new Error("AI Server is not responding.");
                }
                const data = await response.json();
                // Save AI results to show on the Result Page
                localStorage.setItem('user_recommendation', JSON.stringify(data));
                navigate('/result');
            } catch (error) {
                console.error("AI Error:", error);
                alert("The AI Engine is not running. Please start the Flask server.");
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const currentQuestion = questions[currentStep];
    const options = currentQuestion.type === "likert" 
        ? ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        : currentQuestion.options;

    return (
        <div className='quiz-page-container'>
            <Header />
            <div className="quiz-content-wrapper">
                <div className="quiz-top-bar">
                    <span>{currentStep + 1} of {questions.length}</span>
                </div>
                <div className="quiz-card">
                    <div className="question-tag">Question {currentQuestion.id}</div>
                    <h2 className='question-text'>{currentQuestion.question}</h2>
                    <div className="options-container">
                        {options.map((option) => (
                            <label key={option} className={`option-label ${answers[currentQuestion.key] === option ? 'selected' : ''}`}>
                                <input 
                                    type="radio" 
                                    name='quiz-option' 
                                    value={option}
                                    checked={answers[currentQuestion.key] === option} 
                                    onChange={(e) => handleOptionChange(e.target.value)} 
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <div className="quiz-navigation">
                        <button className='nav-btn prev' onClick={handlePrevious} disabled={currentStep === 0}>← Previous</button>
                        <button className='nav-btn next' onClick={handleNext} disabled={!answers[currentQuestion.key]}>
                            {currentStep === questions.length - 1 ? "Get Recommendation" : "Next →"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Quiz;