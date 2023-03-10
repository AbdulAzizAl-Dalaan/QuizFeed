import './QuizDisplay.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Question from './Question';

export default function QuizDisplay() {

    return (
        <Container>
            <Stack gap={2}>
                <div className='quiz-header mt-3 pt-3 mb-2'>
                    <h1 style={{ 'font-family': 'Montagu Slab, serif' }} >Quiz Title</h1>
                    user who created quiz<br /><br />
                    <p>Quiz description</p>
                    # users have taken this quiz - ##% approval<br /><br />
                </div>
                <Question number={1} questionVariant={'q-darkBlue'}></Question>
                <Question number={2} questionVariant={'q-mediumBlue'} buttonVariants={['b-lightBlue', 'b-lightBlue', 'b-lightBlue', 'b-lightBlue']}></Question>
            </Stack>
        </Container>
    );
}