import './Quiz.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

// Pass in enableRefresh to allow site to update when backend is affected
export default function Comments({ comments, enableRefresh }) {
    const urlParams = useParams();

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
        <div>
            <h3 className='display mt-3'>Comments</h3>
            <Row className='mb-3 align-items-center' lg='7'>
                <Form className='w-25' onSubmit={onClickSubmitComment}>
                    <InputGroup>
                        <Form.Control name='comment' placeholder='Enter comment here' as="textarea" aria-label="With textarea" />
                        <Button variant='outline-secondary' id='new-comment' type='submit'>
                            Submit
                        </Button>
                    </InputGroup>
                </Form>
                {comments && comments.length > 0 ?
                    comments.map((comment, idx) => {
                        return (
                            <Col key={idx} className='d-flex align-items-center' md='auto'>
                                {comment.creatorUsername === 'subu' ?
                                    <OverlayTrigger
                                        delay={{ hide: 600 }}
                                        overlay={<CloseButton onClick={(e) => onClickDeleteComment(e, comment.id)} />}
                                    >
                                        <div className='q-mediumGray px-4 py-3 mx-3 mb-3'>
                                            <div className='display-bold'>{comment.creatorUsername}</div>
                                            {comment.text}
                                        </div>
                                    </OverlayTrigger>
                                    :
                                    <div className='q-mediumGray px-4 py-3 mx-3 mb-3'>
                                        <div className='display-bold'>{comment.creatorUsername}</div>
                                        {comment.text}
                                    </div>
                                }
                            </Col>);
                    })
                    : <div className='readable text-center'>No comments yet.</div>}
            </Row>
        </div>
    );
}