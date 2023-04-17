import './ResultMaker.css';
import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
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

    return (
        <div className="q-darkBlue">
            <h1 className='ms-5 mt-4' style={{ 'fontFamily': 'Montagu Slab, serif' }}>Result {index + 1}</h1>
            <Row className='justify-content-center mb-4' md='auto'>
                <div onBlur={updateResultTitle} className='text-center fs-3 mb-3' contentEditable suppressContentEditableWarning={true}>{result.title}</div>
            </Row>
            <Row className='justify-content-center mb-4' md='auto'>
                <p onBlur={updateResultDesc} contentEditable suppressContentEditableWarning={true}>{result.description}</p>
            </Row>
        </div>
    );
}

export default ResultMaker;