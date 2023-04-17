import './QuizDisplay.css';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Question from './Question';
import StyledButton from '../StyledButton';

export default function QuizDisplay() {
    const urlParams = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = React.useState();
    const [userAnswers, setUserAnswers] = React.useState();

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
    function onClickChoice(e, question, newAnswer) {
        e.preventDefault();
        setUserAnswers(
            userAnswers.map((answer, idx) => {
                return (idx === question) ? newAnswer : answer;
            })
        );
    }

    // When the user is ready to receive their results, this method is called
    // It checks to make sure all questions have been answered, and if so, calculates the result and redirects accordingly
    function onClickSubmit(e) {
        e.preventDefault();

        let totalPoints = new Array(quizData.results.length).fill(0);
        for (let question = 0; question < quizData.questions.length; question++) {
            // For each question, find the choice the user chose and the points it rewards
            let points = quizData.questions[question].choices[userAnswers[question]].points;
            // sqlite has no arrays, so parse the string and add that choice's points to the total point count
            const parsedPoints = points.split(',').map(Number);
            totalPoints = totalPoints.map((curPoints, i) => curPoints + parsedPoints[i]);
        }
        // find index of highest element and that is your result
        const result = totalPoints.indexOf(Math.max(...totalPoints));
        // redirect to the correct results page
        navigate('/quiz/' + urlParams.id + '/' + quizData.results[result].id);
    }

    return (
        <Container>
            {quizData &&
                <Stack gap={2}>
                    <div className='quiz-header mt-3 pt-3 mb-2'>
                        <h1 style={{ 'fontFamily': 'Montagu Slab, serif' }} >{quizData.title}</h1>
                        {quizData.creatorUsername}<br /><br />
                        <p>{quizData.description}</p>
                        {quizData.takenNum} {quizData.takenNum === 1 ? 'user has' : 'users have'} taken this quiz - {quizData.approval}% approval<br /><br />
                    </div>
                    {quizData.questions &&
                        quizData.questions.map((question, idx) => {
                            return <Question
                                key={idx}
                                number={idx}
                                text={question.text}
                                choices={question.choices}
                                chosenChoice={userAnswers[idx]}
                                variant={question.variant}
                                onClick={onClickChoice} />
                        })}
                    <div className='mx-auto'>
                        <StyledButton
                            variant='b-mediumBlue'
                            onClick={onClickSubmit}
                        >Generate Results</StyledButton>
                    </div>
                </Stack>}
        </Container>
    );
}