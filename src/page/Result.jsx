// src/components/Result.js
import React, { useEffect } from 'react';
import '../style/result.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Result() {
    const navigate = useNavigate();

    const savedUsername = localStorage.getItem('username');
    const totalQuestions = localStorage.getItem('amountquestion');
    const totalScore = localStorage.getItem('score');
    const quizTitle = localStorage.getItem('title');

    // Perhitungan skor dan persentase
    const percentage = ((totalScore / totalQuestions) * 100).toFixed(1);
    const correctAnswers = totalScore;
    const incorrectAnswers = totalQuestions - totalScore;

    useEffect(() => {
        document.title = 'Result';
    }, []);

    useEffect(() => {


        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!email || !password) {
            navigate('/'); // Redirect to login if no email or password
        }

        else if (!totalQuestions || !totalScore) {
            navigate('/dashboard'); // Redirect to login if no email or password

        }
    }, [navigate]);


    const navigateDashboard = () => {
        navigate('/dashboard');

    };

    return (
        <div className='resultContainer'>
            <Navbar username={savedUsername} />
            <div className="resultContContent">
                <div className='resultBox'>
                    <h2>Result</h2>
                    <div className="resultCard">
                        <h5>{quizTitle}</h5>
                        <div className="score">
                            <p>Score : </p>
                            <span>{percentage}%</span>
                        </div>


                        <div className='detailAnswer'>
                            <p>Correct : {correctAnswers}</p>
                            <p>Incorrect : {incorrectAnswers}</p>
                            <p>Total : {totalQuestions}</p>
                        </div>

                    </div>

                    <div className='resultButton'>
                        <button onClick={navigateDashboard}>Dashboard</button>
                    </div>


                </div>
            </div>
        </div>
    );
};
