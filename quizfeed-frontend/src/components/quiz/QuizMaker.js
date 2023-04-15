import './QuizMaker.css';
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuestionMaker from './QuestionMaker';
import ResultMaker from './ResultMaker';
import StyledButton from '../StyledButton';


// todo: pass in initial values for quiz - will allow editing
export default function QuizMaker() {
    const [quizData, setQuizData] = React.useState({
        creatorUsername: "generic", // fake username so we can post
        title: "Title",
        description: "Description",
        questions: [],
        results: []
    });

     // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async function postData(url = "", data = {})
    {
        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: { "Content-Type": "application/json"},
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    // convert data to format required by database
    function prepDataForSave()
    {
        // convert each points array to comma separated string
        let questions = quizData.questions.map((q_v) => {
            let c = q_v.choices.map((c_v) => {
                return {...c_v, points: c_v.points.join(",")}
            });
            return {...q_v, choices: c};
        });
        return {...quizData, questions: questions}
    }

    // function onClickAddTag(e) {
    // }

    function onClickPublish(e) {
        // set quiz to published status
        // save
        postData("/quiz/", prepDataForSave())
        .then((ret)=>console.log(ret))
        .catch((err)=>console.log(err));
    }

    function onClickSave(e) {
        postData("/quiz/", prepDataForSave())
        .then((ret)=>console.log(ret))
        .catch((err)=>console.log(err));
    }

    function onClickAddResult(e) {
        e.preventDefault();
        let result = {
            "title": "Title",
            "description": "Description"
        };
        let questions = quizData.questions.map((q_v) => {
            let c = q_v.choices.map((c_v) => {
                return {...c_v, points: [...c_v.points, 0]}
            });
            return {...q_v, choices: c};
        });
        setQuizData({
            ...quizData,
            questions: questions,
            results: [...quizData.results, result]
        });
    }

    function onClickAddQuestion(e) {
        e.preventDefault();
        let question = {
            "text": "Question?",
            "variant": "q-mediumBlue",
            "choices": [
              { "text": "choice", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
              { "text": "choice", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
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
            let option = {"text": "choice", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) };
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

    // if new value is not valid, return old value, otherwise return new value as a number
    function updatePoint(old_value, e)
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
    function updateChoicePoints(question_index) {
        return ((choice_index) => {
            return ((point_index) => {
                return ((e) => {
                    let questions = quizData.questions.map((q_v, q_i) => {
                        if (q_i !== question_index) {
                            return q_v;
                        }
                        let c = q_v.choices.map((c_v, c_i) => {
                            if (c_i !== choice_index)
                            {
                                return c_v;
                            }
                            let points = c_v.points.map((p_v, p_i) => {
                                return (p_i !== point_index) ? p_v : updatePoint(p_v, e);
                            });
                            return {...c_v, points: points};
                        });
                        return {...q_v, choices: c};
                    });
                    setQuizData({
                        ...quizData,
                        questions: questions
                    });
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
                                results={quizData.results}
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