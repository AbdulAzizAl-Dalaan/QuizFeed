import './Question.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StyledButton from '../StyledButton';

/*
* Individual question
* number: What number question
* text: What question
* choices: Available options to pick for question
* variant: Style of question (available styles include q-darkBlue and q-mediumBlue) (default is q-darkBlue)
* onClick: What should happen when one of the question's choices is selected
*/
function Question({ number, text, choices, variant, onClick }) {
    return (
        <Container>
            <Stack className={variant ? variant : 'q-darkBlue'} gap={1}>
                <h1 className='ms-5 mt-4' style={{ 'fontFamily': 'Montagu Slab, serif' }} >Question {number + 1}</h1>
                <div className='text-center fs-3 mb-3'>
                    {text}
                </div>
                <Row className='justify-content-center mb-4 choices' md='auto'>
                    {choices ?
                        choices.map((choice, idx) => {
                            return (
                                <Col key={idx} className='mb-4' md='auto'>
                                    <StyledButton variant={choice.variant} onClick={(e) => onClick(e, number, idx)}>{choice.text}</StyledButton>
                                </Col>
                            );
                        })
                        : <div />}
                </Row>
            </Stack>
        </Container >
    );
}

Question.defaultProps = {
    number: 0,
    variant: 'q-darkBlue'
};

export default Question;