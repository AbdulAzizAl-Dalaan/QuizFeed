import './Quiz.css'; // .q-darkBlue, .q-mediumBlue
import './QuestionMaker.css';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
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
        let option = (i) => ({ "text": `Option ${i}`, "variant": "b-mediumBlue", "points": quizData.results.map((_) => { return 0 }) });
        let questions = quizData.questions.map((v, i) => {
            return i !== index ? v : { ...v, choices: v.choices.concat([option(v.choices.length + 1)]) };
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    function toggleRandomizeChoices(e) {
        const left = quizData.questions.slice(0, index);
        const question = { ...quizData.questions[index], randomizeChoices: !quizData.questions[index].randomizeChoices };
        const right = quizData.questions.slice(index + 1, quizData.questions.length);
        setQuizData({
            ...quizData,
            questions: left.concat([question]).concat(right)
        });
    }

    function updateQuestionText(e) {
        let questions = quizData.questions.map((v, i) => {
            return i !== index ? v : { ...v, text: txt(e) };
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    function deleteQuestion(e) {
        const left = quizData.questions.slice(0, index);
        const right = quizData.questions.slice(index + 1, quizData.questions.length);
        setQuizData({
            ...quizData,
            questions: left.concat(right)
        });
    }

    return (
        <Container className={(question.variant ? question.variant : 'q-darkBlue') + " question-content"}>
            <div className='quiz-exit-btn' onClick={deleteQuestion} />

            <Row className='question-header' >
                <Col>
                    <span className='question-title'>Question {index + 1}</span>
                </Col>
                <Col className="question-toggle">
                    <span >
                        <label className="switch">
                            <input type="checkbox" onChange={toggleRandomizeChoices} checked={quizData.questions[index].randomizeChoices} />
                            <span className="slider round"></span>
                        </label>
                        <span className="md">Randomize Order of Options</span>
                    </span>
                </Col>
            </Row>
            <Row>
                <Col
                    onBlur={updateQuestionText}
                    className='text-center fs-3 mb-3'
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {question.text}
                </Col>
            </Row>
            <Row
                className='justify-content-center mb-4 choices'
                md='auto'
            >
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
        </Container >
    );
}

export default QuestionMaker;