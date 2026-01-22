import React, { useState } from 'react'
import Header from '../Components/Navbar/Header'
import Footer from '../Components/Navbar/Footer'
import '../Pages/Quiz.css'
const questions=[
    {
        id:1,
        question:"How confortable are you with problem-solving and logical thinking?",
        description:"(Choose your confidence level from Strongly Agree to Strongly Disagree.)"
    },
    {
        id:2,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:3,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:4,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:5,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:6,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:7,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:8,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:9,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:10,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:11,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:12,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:13,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:14,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
    {
        id:15,
        question:"Do you enjoy writing code and building software applications?",
        description:"(Assess your interest in programming languages and development.)"
    },
]

const Quiz = () => {
    const[currentStep, setCurrentStep]=useState(0);
    const[selectedOption, setSelectedOption]=useState("");
    const handleNext=()=>{
        if(currentStep<questions.length-1){
            setCurrentStep(currentStep+1);
            setSelectedOption("");//this will reset for the next question.
        }
        else{ 
            alert("Quiz Finished! Preparing your Career Recommendation...")
        }
    }
    
        const handlePrevious=()=>{
            if(currentStep>0){
                setCurrentStep(currentStep-1);
                setSelectedOption("");
            }
        }
    

  return (
    <div className='quiz-page-container'>
        < Header />
        <div className="quiz-content-wrapper">
            <div className="quiz-top-bar">
                <span>
                    {currentStep+1} of {questions.length}

                </span>
                <button className='close-quiz'>X</button>
            </div>
            <div className="quiz-card">
                <div className="question-tag">Question{questions[currentStep].id}</div>
                <h2 className='question-text'>{questions[currentStep].question}</h2>
                <p className="question-desc">{questions[currentStep].description}</p>
                <div className="options-container">
                    {["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree",].map((option)=>(
                        <label key={option} className={`option-label $ {selectedOption===option ? 'selected':''}`}>
                            <input type="radio" name='quiz-option' value={option}
                            checked={selectedOption===option} onChange={(e)=>setSelectedOption(e.target.value)} />
                            {option}
                        </label>
                    ))}
                </div>
                <div className="quiz-navigation">
                    <button className='nav-btn prev' onClick={handlePrevious} disabled={currentStep===0}>← Previous</button>
                    <button className='nav-btn next' onClick={handleNext} disabled={! selectedOption}>{currentStep===questions.length-1 ? "Finish": "Next→"}</button>
                </div>
            </div>
        </div>
        < Footer />
      
    </div>
  )
}

export default Quiz
