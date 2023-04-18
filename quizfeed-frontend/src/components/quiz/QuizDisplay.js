import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Question from './Question';
import StyledButton from '../StyledButton';
import QuizInfo from './QuizInfo';

// Displays quiz info and questions, allows for the user to select choices for each question and generate results
export default function QuizDisplay() {
    const urlParams = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = React.useState();
    // keeps track of what answers the user has selected
    const [userAnswers, setUserAnswers] = React.useState();
    // used to determine if the submit button should be enabled (only if all questions have been answered)
    const [answerCounter, setAnswerCounter] = React.useState(false);

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

        // if a choice had not been previously chosen for this question, increment counter
        // this way when answerCounter equals number of questions, the user can submit
        if (userAnswers[question] === -1) setAnswerCounter(answerCounter + 1);

        setUserAnswers(
            userAnswers.map((answer, idx) => {
                return (idx === question) ? newAnswer : answer;
            })
        );
    }

    // When the user is ready to receive their results, this method is called
    // It checks to make sure all questions have been answered, and if so, calculates the result and redirects accordingly
    async function onClickSubmit(e) {
        e.preventDefault();

        // check to make sure all questions have been answered
        if (!userAnswers.every((answer) => answer !== -1)) {
            return;
        }

        let totalPoints = new Array(quizData.results.length).fill(0);
        for (let question = 0; question < quizData.questions.length; question++) {
            // For each question, find the choice the user chose and the points it rewards
            let points = quizData.questions[question].choices[userAnswers[question]].points;
            // sqlite has no arrays, so parse the string and add that choice's points to the total point count
            const parsedPoints = points.split(',').map(Number);
            totalPoints = totalPoints.map((curPoints, i) => curPoints + parsedPoints[i]);
        }
        // find index of highest element and that is your result
        const result = quizData.results[totalPoints.indexOf(Math.max(...totalPoints))].id;

        // update user's results
        fetch('/history/' + urlParams.id + '/' + 'subu')
            .then(res => res.json())
            .then(data => {
                // If user has not taken it before
                if (data.length === 0) {
                    // then create history
                    fetch('/history/' + urlParams.id + '/' + result, {
                        method: 'POST', body: JSON.stringify({ username: 'subu' }),
                        headers: { 'Content-type': 'application/json' }
                    });
                }
            });

        // update quiz stats
        fetch('/quiz/stats/' + urlParams.id + '/' + result, { method: 'PATCH' });
        // redirect to the correct results page
        navigate('/quiz/' + urlParams.id + '/' + result);
    }

    return (
        <Container>
            {quizData &&
                <Stack gap={2}>
                    <QuizInfo quizData={quizData} />
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
                            disabled={answerCounter !== quizData.questions.length}
                            tooltip='Answer all questions to continue'
                        >Generate Results</StyledButton>
                    </div>
                </Stack>}
        </Container>
    );
}