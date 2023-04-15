import './QuestionMaker.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StyledButton from '../StyledButton';
import OptionMaker from './OptionMaker';



/*
* Individual question
* number: What number question
* text: What question
* choices: Available options to pick for question
* variant: Style of question (available styles include q-darkBlue and q-mediumBlue) (default is q-darkBlue)
*/
function QuestionMaker({ number, text, choices, variant, onClick, updateQuestionText, updateChoiceText, updateChoicePoints }) {
    return (
        <Container>
            <Stack className={variant ? variant : 'q-darkBlue'} gap={1}>
                <h1 className='ms-5 mt-4' style={{ 'fontFamily': 'Montagu Slab, serif' }} >Question {number + 1}</h1>
                <div onBlur={updateQuestionText} className='text-center fs-3 mb-3' contentEditable suppressContentEditableWarning={true}>
                    {text}
                </div>
                <Row className='justify-content-center mb-4 choices' md='auto'>
                    {choices &&
                        choices.map((choice, idx) => {
                            return (
                                <Col key={idx} className='mb-4' md='auto'>
                                    <OptionMaker
                                        key={idx}
                                        number={idx}
                                        text={choice.text}
                                        variant={choice.variant}
                                        points={choice.points}
                                        updateChoiceText={updateChoiceText(idx)}
                                        updateChoicePoints={updateChoicePoints(idx)} 
                                    />
                                </Col>
                            );
                        })}
                        <Col>
                            <StyledButton
                                variant='b-mediumBlue'
                                onClick={onClick}>
                                Add another option
                            </StyledButton>
                        </Col>
                </Row>
            </Stack>
        </Container >
    );
}

QuestionMaker.defaultProps = {
    number: 0,
    variant: 'q-darkBlue'
};

export default QuestionMaker;