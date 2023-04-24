import './QuizList.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Stack from 'react-bootstrap/esm/Stack';

export default function QuizListItem({ quizData }) {
    const navigate = useNavigate();
    
    return (
        <Stack gap={2}>
            {quizData &&
                <div className='list-item mt-3 ms-4 me-4 pt-3 ps-3 mb-3' onClick={() => navigate('/quiz/' + quizData.id)}>
                    <h3 style={{ 'fontFamily': 'Montagu Slab, serif' }} >{quizData.title}</h3>
                    {quizData.creatorUsername}<br /><br />
                    <p>{quizData.description}</p>
                    {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz - {quizData.likes} likes<br /><br />
                </div>}
        </Stack>
    )
}