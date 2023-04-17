import './OptionMaker.css';
import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { QuizMakerContext } from './QuizMaker';


/*
* Individual option/choice
* index:             The given choice's index in the given question object
* question_index:    Then given question's index in question array
* choice:            The given choice
*/
function OptionMaker({ index, question_index, choice }) {
    const [quizData, setQuizData, txt] = useContext(QuizMakerContext);

    function updateChoiceText(e) {
        let questions = quizData.questions.map((q_v, q_i) => {
            if (q_i !== question_index) {
                return q_v;
            }
            let c = q_v.choices.map((c_v, c_i) => {
                return c_i !== index ? c_v : {...c_v, text: txt(e)}
            });
            return {...q_v, choices: c};
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    // if new value is not valid, return old value, otherwise return new value as a number
    function updatePoint(e, old_value)
    {
        let val = Number(txt(e));
        if (isNaN(val) || val === null || val === undefined)
        {
          e.target.textContent = old_value;
          return old_value;
        }
        e.target.textContent = val;
        return val;
    }

    // horrible horrible biting gnawing
    function updateChoicePoints(e, point_index) {
        let questions = quizData.questions.map((q_v, q_i) => {
            if (q_i !== question_index) {
                return q_v;
            }
            let c = q_v.choices.map((c_v, c_i) => {
                if (c_i !== index)
                {
                    return c_v;
                }
                let points = c_v.points.map((p_v, p_i) => {
                    return (p_i !== point_index) ? p_v : updatePoint(e, p_v);
                });
                return {...c_v, points: points};
            });
            return {...q_v, choices: c};
        });
        setQuizData({
            ...quizData,
            questions: questions
        });
    }

    return (
        <Container>
            <Stack className={choice.variant ? choice.variant : 'q-mediumBlue'} gap={1}>
                <p onBlur={updateChoiceText} contentEditable suppressContentEditableWarning={true}>{choice.text}</p>
                { quizData.results &&
                      quizData.results.map((result, idx)=>{
                          return(
                              <div key={idx}>
                                  {result.title}: <span onBlur={(e)=>updateChoicePoints(e, idx)} contentEditable suppressContentEditableWarning={true}>{choice.points[idx]}</span>
                              </div>
                          )
                      })
                }
            </Stack>
        </Container >
    );
}

export default OptionMaker;