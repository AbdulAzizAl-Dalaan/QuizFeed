import './Question.css'; // .q-darkBlue, .q-mediumBlue
import './ResultMaker.css';
import './QuizMaker.css';  // .quiz-exit-btn
import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { QuizMakerContext } from './QuizMaker';


/*
* Individual result
* index:  The given result's index in the result array
* result: The given result
*/
function ResultMaker({ index, result }) {
    const [quizData, setQuizData, txt] = useContext(QuizMakerContext);

    function updateResultTitle(e) {
        let results = quizData.results.map((v, i) => {
            return i !== index ?  v : {...v, title: txt(e)};
        });
        setQuizData({
            ...quizData,
            results: results
        });
    }

    function updateResultDesc(e) {
        let results = quizData.results.map((v, i) => {
            return i !== index ?  v : {...v, description: txt(e)};
        });
        setQuizData({
            ...quizData,
            results: results
        });
    }

    function deleteResult(e) {
        const left = quizData.results.slice(0, index);
        const right = quizData.results.slice(index + 1, quizData.results.length);
        setQuizData({
            ...quizData,
            results: left.concat(right)
        });
    }

    return (
        <Container className="q-darkBlue result-content">
            <div className='quiz-exit-btn' onClick={deleteResult}>X</div>
            <Row>
                <Col
                    className='justify-content-left mb-4 result-title'
                    md='auto'
                    onBlur={updateResultTitle}
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {result.title}
                </Col>
            </Row>
            <Row
                className='justify-content-left result-desc'
                md='auto'
            >
                <p onBlur={updateResultDesc} contentEditable suppressContentEditableWarning={true}>{result.description}</p>
            </Row>
        </Container>
    );
}

export default ResultMaker;