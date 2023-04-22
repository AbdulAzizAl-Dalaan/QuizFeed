import './Question.css'; // .q-darkBlue, .q-mediumBlue
import './QuestionMaker.css';
import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StyledButton from '../StyledButton';
import OptionMaker from './OptionMaker';
import { QuizMakerContext } from './QuizMaker';


/*
* Individual question
* index:   The given question's index in the question array
* qustion: The given question
*/
function QuestionMaker({ index, question }) {
    const [quizData, setQuizData, txt] = useContext(QuizMakerContext);

    // add another option to question
    function onClickAddOption(e) {
        let option = (i)=>({"text": `Option ${i}`, "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) });
        let questions = quizData.questions.map((v, i) => {
            return i !== index ?  v : {...v, choices: v.choices.concat([option(v.choices.length + 1)])};
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    function updateQuestionText(e) {
        let questions = quizData.questions.map((v, i) => {
            return i !== index ?  v : {...v, text: txt(e)};
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    return (
        <Container>
            <Stack className={question.variant ? question.variant : 'q-darkBlue'} gap={1}>
                <h1 className='ms-5 mt-4' style={{ 'fontFamily': 'Montagu Slab, serif' }} >Question {index + 1}</h1>
                <div onBlur={updateQuestionText} className='text-center fs-3 mb-3' contentEditable suppressContentEditableWarning={true}>
                    {question.text}
                </div>
                <Row className='justify-content-center mb-4 choices' md='auto'>
                    {question.choices &&
                        question.choices.map((choice, idx) => {
                            return (
                                <Col key={idx} className='mb-4' md='auto'>
                                    <OptionMaker
                                        key={idx}
                                        index={idx}
                                        question_index={index}
                                        choice={choice}
                                    />
                                </Col>
                            );
                        })}
                        <Col>
                            <StyledButton
                                variant='b-mediumBlue'
                                onClick={onClickAddOption}>
                                Add another option
                            </StyledButton>
                        </Col>
                </Row>
            </Stack>
        </Container >
    );
}

export default QuestionMaker;