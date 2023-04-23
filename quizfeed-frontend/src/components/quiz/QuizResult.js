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
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    const [formattedDescription, setFormattedDescription] = React.useState();

    const [refresh, enableRefresh] = React.useState(false);

    // Load the results
    React.useEffect(() => {
        const setData = async () => {
            fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
                .then(res => res.json())
                .then(data => {
                    setQuizData(data);
                    console.log(data)
                    setResultData(data.results[0]);
                    setFormattedDescription(formatString(data.results[0].description));
                });
        }

        setData();
    }, [urlParams]);

    // If refresh is changed to true, refresh data (so user can see changes reflected in frontend, too)
    React.useEffect(() => {
        if (refresh) {
            async function refreshData() {
                await fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
                    .then(res => res.json())
                    .then(data => {
                        setQuizData(data);
                    });
            }

            refreshData();
            enableRefresh(false);
        }
    }, [refresh, urlParams]);

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

    // Allows for HTML elements in strings stored in backend
    function formatString(toFormat) {
        const elements = toFormat.match(/<[^<>]+>/g);

        function returnElement(element) {
            element = element.replace('<', '').replace('/>', '').trim();
            switch (element) {
                case "br":
                    return <br />;
                default:
                    return;
            }
        }

        return (
            <p>
                {elements ?
                    elements.map((element, idx) => {
                        const i = toFormat.search(element);
                        const substring = toFormat.substring(0, i);
                        // Remove element and string leading up to element
                        toFormat = toFormat.substring(i + element.length).replace(element, '');

                        let leftover = ""; // if there are no more elements
                        if (idx + 1 === elements.length) leftover = toFormat;
                        return (
                            <span key={idx}>
                                {substring}{returnElement(element)}{leftover}
                            </span>
                        );
                    })
                    : toFormat
                }
            </p >
        );
    }

    return (
        <Container>
            {quizData && resultData &&
                <Stack gap={2}>
                    <QuizInfo quizData={quizData} />

                    <Stack gap={3} className='q-darkBlue text-center py-4'>
                        <h3 className='display'>Results</h3>
                        <h1 className='readable'>{resultData.title}</h1><br />
                        <h4 className='readable'>{formattedDescription}</h4><br /><br />
                        <p style={{ 'fontSize': '80%' }}>
                            {quizData.takenNum !== 0 ? Math.round(resultData.receivedNum / quizData.takenNum * 100) : 0}% of all quiz takers got the same result
                        </p>
                    </Stack>

                    <Row className='mt-3'>
                        <Col className='d-flex justify-content-end align-items-center'>
                            <CopyToClipboard text={window.location.href}>
                                <StyledButton>Share results via url</StyledButton>
                            </CopyToClipboard>
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

                    <Comments comments={quizData.comments} enableRefresh={enableRefresh} />
                </Stack>
            }
        </Container>);
}