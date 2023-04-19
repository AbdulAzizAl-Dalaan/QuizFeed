import './QuizDisplay.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';

// Displays quiz info like title, description, etc
// Expects quizData to be a dict with title, creatorUsername, description, takenNum, and approval
export default function QuizInfo({ quizData }) {
    return (
        <Stack gap={2}>
            {quizData &&
                <div className='quiz-header mt-3 pt-3 mb-2'>
                    <h1 style={{ 'fontFamily': 'Montagu Slab, serif' }} >{quizData.title}</h1>
                    {quizData.creatorUsername}<br /><br />
                    <p>{quizData.description}</p>
                    {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz - {quizData.approval}% approval<br /><br />
                </div>}
        </Stack>
    );
}