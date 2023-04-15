import './QuizMaker.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuestionMaker from './QuestionMaker';
import ResultMaker from './ResultMaker';
import StyledButton from '../StyledButton';


// todo: pass in initial values for quiz - will allow editing
export default function QuizMaker() {
    const [quizData, setQuizData] = React.useState(
      {
        CreatorUsername: "",
        title: "Title",
        description: "Description",
        questions: [],
        results: []
      }
    );

    // function onClickAddTag(e) {
    // }

    function onClickPublish(e) {
        // save
        // set to published status
    }

    function onClickSave(e) {
        // save
    }

    function onClickAddResult(e) {
        e.preventDefault();
        let result = {
            "title": "Title",
            "description": "Description"
        };
        setQuizData({
            ...quizData,
            results: [...quizData.results, result]
        });
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
            let questions = quizData.questions.map((v, i) => {
                return i !== question_index ?  v : {...v, choices: v.choices.concat([option])};
            });
            setQuizData({
              ...quizData,
              questions: questions
            });
        });
    }

    // extract text from event object
    function txt(e) {
        return e.target.textContent;
    }

    function updateTitle(e) {
        setQuizData({...quizData, title: txt(e)});
    }

    function updateDesc(e) {
        setQuizData({...quizData, description: txt(e)});
    }

    // ugly functions: would be better to handle in their respective components
    function updateQuestionText(question_index) {
        return ((e) => {
            let questions = quizData.questions.map((v, i) => {
                return i !== question_index ?  v : {...v, text: txt(e)};
            });
            setQuizData({
              ...quizData,
              questions: questions
            });
        });
    }

    function updateResultTitle(result_index) {
      return ((e) => {
          let results = quizData.results.map((v, i) => {
              return i !== result_index ?  v : {...v, title: txt(e)};
          });
          setQuizData({
            ...quizData,
            results: results
          });
      });
    }

    function updateResultDesc(result_index) {
        return ((e) => {
          let results = quizData.results.map((v, i) => {
              return i !== result_index ?  v : {...v, description: txt(e)};
          });
          setQuizData({
            ...quizData,
            results: results
          });
      });
    }

    function updateChoiceText(question_index) {
        return ((choice_index) => {
            return ((e) => {
                let questions = quizData.questions.map((q_v, q_i) => {
                    if (q_i !== question_index) {
                        return q_v;
                    }
                    let c = q_v.choices.map((c_v, c_i) => {
                        return c_i !== choice_index ? c_v : {...c_v, text: txt(e)}
                    });
                    return {...q_v, choices: c};
                });
                setQuizData({
                    ...quizData,
                    questions: questions
                });
            });
        });
    }

    function updateChoicePoints(question_index) {
        return ((choice_index) => {
            return ((e) => {
                let questions = quizData.questions.map((q_v, q_i) => {
                    if (q_i !== question_index) {
                        return q_v;
                    }
                    let c = q_v.choices.map((c_v, c_i) => {
                        return c_i !== choice_index ? c_v : {...c_v, points: txt(e)}
                    });
                    return {...q_v, choices: c};
                });
                setQuizData({
                    ...quizData,
                    questions: questions
                });
            });
        });
    }

    return (
        <Container>
            {
                <Stack gap={2}>
                    <div className='quiz-header mt-3 pt-3 mb-2' style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                        <div>
                            <h1 onBlur={updateTitle} style={{ 'fontFamily': 'Montagu Slab, serif' }} contentEditable suppressContentEditableWarning={true}>{quizData.title}</h1>
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
                            <p onBlur={updateDesc} contentEditable suppressContentEditableWarning={true}>{quizData.description}</p>
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
                    <div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                            {quizData.results &&
                                quizData.results.map((result, idx) => {
                                    return <ResultMaker
                                        key={idx}
                                        number={idx}
                                        title={result.title}
                                        desc={result.description}
                                        updateResultTitle={updateResultTitle(idx)}
                                        updateResultDesc={updateResultDesc(idx)}
                                    />
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <StyledButton
                            variant='b-mediumBlue'
                            onClick={onClickAddResult}
                        >Add another result</StyledButton>
                    </div>
                    {quizData.questions &&
                        quizData.questions.map((question, idx) => {
                            return <QuestionMaker
                                key={idx}
                                number={idx}
                                text={question.text}
                                choices={question.choices}
                                variant={question.variant}
                                onClick={onClickAddOption(idx)}
                                updateQuestionText={updateQuestionText(idx)}
                                updateChoiceText={updateChoiceText(idx)}
                                updateChoicePoints={updateChoicePoints(idx)}
                            />
                        })
                    }
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