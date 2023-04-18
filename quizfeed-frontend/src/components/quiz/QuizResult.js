import './Quiz.css';
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import QuizInfo from './QuizInfo';
import Comments from './Comments';
import StyledButton from '../StyledButton';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

// Displays the results page for a quiz, and does so in a way that allows for the url to be shared and it works
export default function QuizDisplay() {
    const urlParams = useParams();
    const [quizData, setQuizData] = React.useState();
    const [resultData, setResultData] = React.useState();

    const [refresh, enableRefresh] = React.useState(false);

    // Load the results
    React.useEffect(() => {
        const setData = async () => {
            fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
                .then(res => res.json())
                .then(data => {
                    setQuizData(data);
                    setResultData(data.results[urlParams.result - 1]);
                });
        }

        setData();
    }, [urlParams]);

    // Refresh data (so user can see changes reflected in frontend, too)
    React.useEffect(() => {
        if (refresh) {
            refreshData();
            enableRefresh(false);
        }
    }, [refresh]);

    // Allows for user to see input changed on screen
    async function refreshData() {
        await fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
            });
    }

    // When the "display on profile" switch is toggled, update history
    function onToggle(e) {
        fetch('/history/' + urlParams.id + '/' + urlParams.result,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    username: 'subu',
                    visible: e.target.checked,
                }),
                headers: { 'Content-type': 'application/json' }
            });
    }

    // When the 'like' or 'dislike' buttons are clicked on feedback, update quiz
    function onClickFeedback(e, liked) {
        e.preventDefault();

        // Update the quiz feedback numbers
        fetch('/quiz/feedback/' + urlParams.id, {
            method: 'PATCH',
            body: JSON.stringify({
                approval: liked
            }),
            headers: { 'Content-type': 'application/json' }
        }).then(enableRefresh(true));
    }

    // When the 'submit' comment button is clicked, add comment
    function onClickSubmitComment(e) {
        e.preventDefault();

        if (e.target.comment.value === '') {
            return;
        }

        // Add comment
        fetch('/quiz/comment/' + urlParams.id, {
            method: 'POST',
            body: JSON.stringify({
                username: 'subu',
                text: e.target.comment.value
            }),
            headers: { 'Content-type': 'application/json' }
        }).then(enableRefresh(true));

        e.target.comment.value = '';
    }

    // When the 'x' comment button is clicked, delete that comment
    function onClickDeleteComment(e, id) {
        e.preventDefault();

        fetch('/quiz/comment/' + urlParams.id + '/' + id, {
            method: 'DELETE'
        }).then(enableRefresh(true));
    }

    return (
        <Container>
            {quizData && resultData &&
                <Stack gap={2}>
                    <QuizInfo quizData={quizData} />

                    <Stack gap={3} className='q-darkBlue text-center py-4'>
                        <h3 className='display'>Results</h3>
                        <h1>{resultData.title}</h1><br />
                        <h4>{resultData.description}</h4><br /><br />
                        <p style={{ 'fontSize': '80%' }}>
                            {quizData.takenNum !== 0 ? Math.round(resultData.receivedNum / quizData.takenNum * 100) : 0}% of all quiz takers got the same result
                        </p>
                    </Stack>

                    <Row className='mt-3'>
                        <Col className='d-flex justify-content-end align-items-center'>
                            <StyledButton>Share results via url</StyledButton>
                        </Col>
                        <Col lg={2}>
                            <Stack className='text-center' style={{ 'fontSize': '150%' }}>
                                feedback
                                <div>
                                    <NavLink onClick={(e) => onClickFeedback(e, true)} style={{ 'color': 'rgb(13, 24, 33)' }}>
                                        <FontAwesomeIcon icon={faThumbsUp} size='lg' className='mx-2' />
                                    </NavLink>
                                    <NavLink onClick={(e) => onClickFeedback(e, false)} style={{ 'color': 'rgb(13, 24, 33)' }}>
                                        <FontAwesomeIcon icon={faThumbsDown} size='lg' className='mx-2' />
                                    </NavLink>
                                </div>
                            </Stack>
                        </Col>
                        <Col className='d-flex justify-content-start align-items-center'>
                            <StyledButton>Share results with friends</StyledButton>
                        </Col>
                    </Row>

                    <Form className='d-flex justify-content-center mt-3'>
                        <Stack className='d-flex align-items-center' direction='horizontal' gap={2}>
                            <Form.Check type='switch' id='display-on-profile'>
                                <Form.Check.Input className='f-toggle' id='display-on-profile' style={{
                                    'height': '2rem', 'width': '3.75rem', 'borderRadius': '4rem'
                                }} defaultChecked={true} onChange={onToggle} />
                            </Form.Check>
                            <div className='readable' style={{ 'fontSize': '125%' }}>Display results on profile</div>
                            <OverlayTrigger
                                placement='right'
                                overlay={<Tooltip id='display-on-profile-info'>
                                    If enabled, others will be able to view which result you received when on your profile.
                                </Tooltip>}>
                                <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
                            </OverlayTrigger>
                        </Stack>
                    </Form>

                    <Comments onClickSubmitComment={onClickSubmitComment} onClickDeleteComment={onClickDeleteComment} comments={quizData.comments} />
                </Stack>
            }
        </Container>);
}