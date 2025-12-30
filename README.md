# CourseInsight: AI-Driven Career Path Predictor

An Intelligent Career Guidance System that uses Machine Learning to predict student career paths based on technical and behavioral diagnostics.

## Project Overview
This project bridges the gap between student skills and career roles. It features a full-stack architecture with a React frontend, Spring Boot backend, and a Python-based ML engine.

## Technology Stack
* **Frontend**: React.js (Vite), React Router, CSS Modules
* **Backend**: Java Spring Boot, Spring Data JPA
* **Database**: PostgreSQL
* **AI/ML**: Python (Scikit-Learn), Pandas, `roo_data.csv`

## Project Structure
* `/Backend`: Spring Boot API handling User Authentication and Database logic.
* `/Frontend`: React application for the User Interface (Login, Signup, and Quiz).
* `/ML_Engine`: Python scripts for data processing and career prediction.

## 🤖 Use of AI
The core of this website is a Predictive Model trained on `roo_data.csv`. 
1. **Input**: 15 Diagnostic questions assessing logical and technical skills.
2. **Analysis**: The backend passes scores to the Python ML model.
3. **Output**: A personalized career recommendation with a confidence score.

## ⚙️ Setup Instructions
1. **Backend**: Run `./mvnw spring-boot:run` (Requires JDK 17+ and PostgreSQL).
2. **Frontend**: Run `npm install` and `npm start` in the `/Frontend` directory.