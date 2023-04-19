import './QuizList.css'
import React from 'react';
import { useParams } from 'react-router-dom';
import Stack from 'react-bootstrap/esm/Stack';

export default function QuizListItem({ quizData }) {
    return (
        <Stack gap={2}>
            {quizData &&
                <div className='list-item mt-3 pt-3 ps-3 mb-3'>
                    <h3 style={{ 'fontFamily': 'Montagu Slab, serif' }} >{quizData.title}</h3>
                    {quizData.creatorUsername}<br /><br />
                    <p>{quizData.description}</p>
                    {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz - {quizData.approval}% approval<br /><br />
                </div>}
        </Stack>
    )
}