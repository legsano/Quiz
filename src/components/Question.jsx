// src/components/Question.js
import React, { useState, useEffect } from 'react';

import '../style/question.css'

const Question = ({ data, currentQuestionIndex, setCurrentQuestionIndex, answersHistory, setAnswersHistory, setScore, amount }) => {
    const { question, correct_answer, incorrect_answers } = data;
    const [answers, setAnswers] = useState([]);
    const labels = ['A', 'B', 'C', 'D'];

    useEffect(() => {
        const shuffledStatus = localStorage.getItem('shuffledStatus');

        if (shuffledStatus !== 'true') {
            // Menetapkan jawaban mengacak jika belum diacak
            const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.4657);
            setAnswers(shuffledAnswers);

            // Simpan status pengacakan di localStorage
            localStorage.setItem('shuffledStatus', 'true');
        } else {
            // Ambil jawaban yang tidak diacak
            setAnswers([correct_answer, ...incorrect_answers]);
        }

        // Hapus status pengacakan jika diperlukan pada saat navigasi keluar dari komponen
        return () => localStorage.removeItem('shuffledStatus');

    }, [data, currentQuestionIndex]);

    const handleButtonClick = (isCorrect, answer) => {
        const currentAnswer = answersHistory[currentQuestionIndex];
        let newScore = 0;

        if (currentAnswer === null) {
            // First selection
            if (isCorrect) {
                newScore = setScore(prevScore => {
                    const updatedScore = prevScore + 1;
                    localStorage.setItem('score', updatedScore);
                    return updatedScore;
                });
            }
        } else if (currentAnswer !== answer) {
            // Change from previous answer
            if (currentAnswer === correct_answer) {
                newScore = setScore(prevScore => {
                    const updatedScore = prevScore - 1;
                    localStorage.setItem('score', updatedScore);
                    return updatedScore;
                });
            }
            if (isCorrect) {
                newScore = setScore(prevScore => {
                    const updatedScore = prevScore + 1;
                    localStorage.setItem('score', updatedScore);
                    return updatedScore;
                });
            }
        }

        // Update history
        const newAnswersHistory = [...answersHistory];
        newAnswersHistory[currentQuestionIndex] = answer;
        setAnswersHistory(newAnswersHistory);
        localStorage.setItem('answersHistory', JSON.stringify(newAnswersHistory)); // Simpan jawaban ke localStorage


        if (currentQuestionIndex < amount - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };


    return (
        <div className='questionBox'>
            <p className='question' dangerouslySetInnerHTML={{ __html: question }} />
            <div className="answerContainer">

                {answers.map((answer, index) => {
                    const isSelected = answersHistory[currentQuestionIndex] === answer;
                    return (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(answer === correct_answer, answer)}
                            className={`button ${isSelected ? 'selected' : ''}`}
                        >
                            <p>{labels[index]}.</p>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    );
                })}
            </div>

        </div>
    );
};

export default Question;
