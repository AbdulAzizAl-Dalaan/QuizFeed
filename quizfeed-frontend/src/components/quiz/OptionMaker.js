import './OptionMaker.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';


/*
* Individual question
* number: What number question
* text: What question
* choices: Available options to pick for question
* variant: Style of question (available styles include q-darkBlue and q-mediumBlue) (default is q-darkBlue)
*/
function OptionMaker({ number, text, variant, points, results, updateChoiceText, updateChoicePoints }) {
    return (
        <Container>
            <Stack className={variant ? variant : 'q-mediumBlue'} gap={1}>
                <p onBlur={updateChoiceText} contentEditable suppressContentEditableWarning={true}>{text}</p>
                { results &&
                      results.map((result, idx)=>{
                          return(
                              <div key={idx}>
                                  {result.title}: <span onBlur={(e)=>updateChoicePoints(idx)(e)} contentEditable suppressContentEditableWarning={true}>{points[idx]}</span>
                              </div>
                          )
                      })
                }
            </Stack>
        </Container >
    );
}

OptionMaker.defaultProps = {
    number: 0,
    variant: 'q-mediumBlue'
};

export default OptionMaker;