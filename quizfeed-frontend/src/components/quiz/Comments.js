import './Quiz.css';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

export default function Comments({ onClickSubmitComment, onClickDeleteComment, comments }) {
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