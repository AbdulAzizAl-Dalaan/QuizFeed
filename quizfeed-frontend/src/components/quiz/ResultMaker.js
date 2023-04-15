import './ResultMaker.css';
import React from 'react';
import Row from 'react-bootstrap/Row';


/*
* Individual question
* number: What number question
* text: What question
* choices: Available options to pick for question
* variant: Style of question (available styles include q-darkBlue and q-mediumBlue) (default is q-darkBlue)
*/
function ResultMaker({ number, title, desc, variant, updateResultTitle, updateResultDesc }) {
    return (
        <div className="q-darkBlue">
            <h1 className='ms-5 mt-4' style={{ 'fontFamily': 'Montagu Slab, serif' }}>Result {number + 1}</h1>
            <Row className='justify-content-center mb-4' md='auto'>
                <div onBlur={updateResultTitle} className='text-center fs-3 mb-3' contentEditable suppressContentEditableWarning={true}>{title}</div>
            </Row>
            <Row className='justify-content-center mb-4' md='auto'>
                <p onBlur={updateResultDesc} contentEditable suppressContentEditableWarning={true}>{desc}</p>
            </Row>
        </div>
    );
}

ResultMaker.defaultProps = {
    number: 0,
    variant: 'q-darkBlue'
};

export default ResultMaker;