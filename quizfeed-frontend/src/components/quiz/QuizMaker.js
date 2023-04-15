import './QuizMaker.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuestionMaker from './QuestionMaker';
import StyledButton from '../StyledButton';

export default function QuizMaker() {
    const [quizData, setQuizData] = React.useState(
      {
        CreatorUsername: "",
        title: "Title",
        description: "Description",
        questions: []
      }
    );

    // function onClickAddTag(e) {
    // }

    function onClickPublish(e) {

    }

    function onClickSave(e) {

    }

    function onClickAddQuestion(e) {
        e.preventDefault();
        let question = {
            "text": "Question?",
            "variant": "q-mediumBlue",
            "choices": [
              { "text": "choice", "variant": "b-mediumBlue", "points": "0,0" },
              { "text": "choice", "variant": "b-mediumBlue", "points": "0,0" },
            ]
        };
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, question]
        });
    }

    // given question index, return a callback function that will add an option to that question
    function onClickAddOption(question_index) {
        return ((e) => {
            let option = {"text": "choice", "variant": "b-mediumBlue", "points": "0,0" };
            let questions = quizData.questions.map((v, i, arr) =>{
                return i !== question_index ?  v : {...v, choices: v.choices.concat([option])};
            });
            setQuizData({
              ...quizData,
              questions: questions
            });
        });
    }

    function edit(e) {
        console.log(e);
    }

    return (
        <Container>
            {
                <Stack gap={2}>
                    <div className='quiz-header mt-3 pt-3 mb-2' style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                        <div>
                            <h1 onClick={edit} style={{ 'fontFamily': 'Montagu Slab, serif' }} className="editable">{quizData.title}</h1>
                        </div>
                        <div>
                            <p>TAGS</p>
                            
                        </div>
                        <div>
                            <StyledButton
                                variant='b-mediumBlue'
                                onClick={onClickPublish}
                            >Publish</StyledButton>
                        </div>

                        <div>
                            <p onClick={edit} className="editable">{quizData.description}</p>
                        </div>
                        <div>
                            <p>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                                Randomize order of questions
                            </p>
                              <p>
                                  <label className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                  </label>
                                  Comment Section
                              </p>
                        </div>
                        <div>
                            <StyledButton
                                variant='b-mediumBlue'
                                onClick={onClickSave}
                            >Save</StyledButton>
                        </div>
                        
                    </div>
                    {quizData.questions &&
                        quizData.questions.map((question, idx) => {
                            return <QuestionMaker
                                key={idx}
                                number={idx}
                                text={question.text}
                                choices={question.choices}
                                variant={question.variant}
                                onClick={onClickAddOption(idx)} />
                        })}
                    <div>
                        <StyledButton
                            variant='b-mediumBlue'
                            onClick={onClickAddQuestion}
                        >Add another question</StyledButton>
                    </div>
                </Stack>
            }
            <div>
                <h1>Quiz values</h1>
                { JSON.stringify(quizData) }
            </div>
        </Container>
    );
}