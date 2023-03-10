import './Question.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import StyledButton from '../StyledButton';

/*
* Individual question
* number: What number question
* questionVariant: Style of question (available styles include q-darkBlue and q-mediumBlue) (default is q-darkBlue)
* buttonVariants: Array of styles for the buttons (see StyledButton for variant options)
*/
function Question({ number, questionVariant, buttonVariants }) {

    return (
        <Container>
            <Stack className={questionVariant} gap={1}>
                <h1 className='ms-5 mt-4' style={{ 'font-family': 'Montagu Slab, serif' }} >Question {number}</h1>
                <div className='text-center fs-3 mb-3'>
                    Question question question?
                </div>
                <Stack className='justify-content-center mb-4' direction='horizontal' gap={3}>
                    <StyledButton variant={buttonVariants[0]}>Option 1</StyledButton>
                    <StyledButton variant={buttonVariants[1]}>Option 2</StyledButton>
                    <StyledButton variant={buttonVariants[2]}>Option 3</StyledButton>
                    <StyledButton variant={buttonVariants[3]}>Option 4</StyledButton>
                </Stack>
            </Stack>
        </Container>
    );
}

Question.defaultProps = {
    number: 0,
    questionVariant: 'q-darkBlue',
    buttonVariants: ['b-mediumBlue', 'b-mediumBlue', 'b-mediumBlue', 'b-mediumBlue']
};

export default Question;