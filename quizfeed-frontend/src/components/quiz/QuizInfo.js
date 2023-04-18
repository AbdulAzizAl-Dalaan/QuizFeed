import './Quiz.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';

// Displays quiz info like title, description, etc
// Expects quizData to be a dict with title, creatorUsername, description, takenNum, and approval
export default function QuizInfo({ quizData }) {
    return (
        <Stack gap={2}>
            {quizData &&
                <div className='quiz-header mt-3 pt-3 mb-2'>
                    <h1 className='display'>{quizData.title}</h1>
                    <p className='readable' style={{ 'fontSize': '125%' }}>by {quizData.creatorUsername}</p><br />
                    <p className='readable-bold'>{quizData.description}</p>
                    <p style={{ 'fontSize': '90%' }}>
                        {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz -&nbsp;
                        {quizData.likes !== 0 || quizData.dislikes !== 0 ?
                            Math.round(quizData.likes / (quizData.likes + quizData.dislikes) * 100) : 0}% approval ({quizData.likes} likes)
                    </p>
                </div>}
        </Stack>
    );
} 