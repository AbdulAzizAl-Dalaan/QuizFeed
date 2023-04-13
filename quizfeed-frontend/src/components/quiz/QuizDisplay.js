import './QuizDisplay.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Question from './Question';

export default function QuizDisplay() {
    const [quizData, setQuizData] = React.useState();
    const [userAnswers, setUserAnswers] = React.useState();
    const urlParams = useParams();

    // Load the quiz questions and initialize the user's answers to nothing
    React.useEffect(() => {
        fetch('/quiz/' + urlParams.id)
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
                setUserAnswers(new Array(data.questions.length).fill(-1));
            });
    }, [urlParams]);

    // When a choice is selected for a question, this method is called and updates the user's selections
    // Allows for a user to change previous selections
    function onClick(e, question, newAnswer) {
        e.preventDefault();
        setUserAnswers(
            userAnswers.map((answer, idx) => {
                return (idx === question) ? newAnswer : answer;
            })
        );
        console.log(userAnswers);
    }

    return (
        <Container>
            {quizData && <Stack gap={2}>
                <div className='quiz-header mt-3 pt-3 mb-2'>
                    <h1 style={{ 'fontFamily': 'Montagu Slab, serif' }} >{quizData.title}</h1>
                    {quizData.creatorUsername}<br /><br />
                    <p>{quizData.description}</p>
                    {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz - {quizData.approval}% approval<br /><br />
                </div>
                {quizData.questions ?
                    quizData.questions.map((question, idx) => {
                        return (<Question key={idx} number={idx} text={question.text} choices={question.choices} variant={question.variant} onClick={onClick} />);
                    })
                    : <div />}
            </Stack>}
        </Container>
    );
}