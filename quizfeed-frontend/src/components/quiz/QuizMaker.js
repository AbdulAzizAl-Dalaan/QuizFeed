import './Question.css'; // .q-darkBlue, .q-mediumBlue
import './QuizMaker.css';
import React, {createContext, useState, useEffect} from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from "react-router-dom";
import QuestionMaker from './QuestionMaker';
import ResultMaker from './ResultMaker';
import TagMaker from './TagMaker';
import StyledButton from '../StyledButton';

export const QuizMakerContext = createContext();

/*
* QuizMaker
* quiz: Initial quiz data
*/
function QuizMaker() {
    const urlParams = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({});

    // initialize quiz given url
    useEffect(() => {
        // if quiz ID is given, initialize quiz data with quiz from database
        if (urlParams.id) {
            fetch('/quiz/' + urlParams.id)
            .then(res => {
                if (!res.ok) {
                    throw Error(res); // this will send entire object
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setQuizData(unpackData(data));
                }
                else {
                    throw Error(`ERROR: quiz with could not load quiz data for quiz with id ${urlParams.id}`);
                }
            })
            .catch((err) => {
                console.log(err); // TODO make this an error message
                navigate("/");
            });
        } else { // id not given: initilize quiz data with empty quiz
            const quiz = {
                // TODO: replace fake username with user's genuine username
                creatorUsername: "generic", // fake username so we can post
                randomizeQuestions: true,
                allowComments: false,
                title: "Title",
                description: "Description",
                questions: [],
                results: [],
                tags: []
            }
            setQuizData(quiz);
        }
    }, [navigate, urlParams]);

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
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async function patchData(url = "", data = {})
    {
        const response = await fetch(url, {
            method: "PATCH",
            cache: "no-cache",
            headers: { "Content-Type": "application/json"},
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async function deleteData(url = "")
    {
        const response = await fetch(url, {
            method: "DELETE",
            cache: "no-cache",
            headers: { "Content-Type": "application/json"},
            redirect: "follow",
            referrerPolicy: "no-referrer",
            // body: "", // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }
        return response.json(); // parses JSON response into native JavaScript objects
    }

    // convert data to format required by database
    function packData(data)
    {
        // convert each points array to comma separated string
        let questions = data.questions.map((q_v) => {
            let c = q_v.choices.map((c_v) => {
                return {...c_v, points: c_v.points.join(",")}
            });
            return {...q_v, choices: c};
        });
        return {...data, questions: questions}
    }

    // convert database format to usable format
    function unpackData(data)
    {
        // convert each points array from comma separated string to array
        let questions = data.questions.map((q_v) => {
            let c = q_v.choices.map((c_v) => {
                return {...c_v, points: c_v.points.split(",")}
            });
            return {...q_v, choices: c};
        });
        return {...data, questions: questions}
    }

    function saveQuiz(data) {
        // no id: create quiz, get id
        if (data.id == null)
        {
            postData("/quiz/", packData(data))
            .then((resData)=>{setQuizData(unpackData(resData))})
            .catch((err)=>console.log(err));
        }
        // id: update quiz using id
        else
        {
            patchData(`/quiz/${data.id}`, packData(data))
            .then((resData)=>{setQuizData(unpackData(resData))})
            .catch((err)=>console.log(err));
        }
    }

    function onClickPublish(e) {
        saveQuiz({...quizData, publishedAt: Date.now()});
    }

    function onClickSave(e) {
        saveQuiz(quizData);
    }

    function onClickDelete(e) {
        // has id: exists in database and must be deleted from database
        if (quizData.id != null) {
            deleteData(`/quiz/${quizData.id}`)
            .then((res)=>{console.log(res)})
            .then(navigate("/"))
            .catch((err)=>console.log(err));
        } else {
            navigate("/");
        }
    }

    function onClickCancel(e) {
        // leave w/o saving
        navigate("/");
    }

    function toggleComments(e) {
        setQuizData({...quizData, allowComments: !quizData.allowComments});
    }

    function toggleRandomizeQuestions(e) {
        setQuizData({...quizData, randomizeQuestions: !quizData.randomizeQuestions});
    }

    function onClickAddTag(e) {
        e.preventDefault();
        const tag = (i) => ({"text": `Tag ${i}`});
        setQuizData({
            ...quizData,
            tags: [...quizData.tags, tag(quizData.tags.length + 1)]
        });
    }

    function onClickAddResult(e) {
        e.preventDefault();
        const result = (i) => ({
            "title": `Result ${i}`,
            "description": "Description"
        });
        const questions = quizData.questions.map((q_v) => {
            const c = q_v.choices.map((c_v) => {
                return {...c_v, points: [...c_v.points, 0]}
            });
            return {...q_v, choices: c};
        });
        setQuizData({
            ...quizData,
            questions: questions,
            results: [...quizData.results, result(quizData.results.length + 1)]
        });
    }

    function onClickAddQuestion(e) {
        e.preventDefault();
        const question = {
            "text": "Question?",
            "variant": "q-darkBlue",
            "choices": [
              { "text": "Option 1", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
              { "text": "Option 2", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
            ],
            "randomizeChoices": true
        };
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, question]
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

    return (
        <QuizMakerContext.Provider value={[quizData, setQuizData, txt]}>
            <Container>
                {
                    <Stack gap={2}>
                        <div className='quiz-header mt-3 pt-3 mb-2' style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                            <div>
                                <h1 onBlur={updateTitle} style={{ 'fontFamily': 'Montagu Slab, serif' }} contentEditable suppressContentEditableWarning={true}>{quizData.title}</h1>
                            </div>
                            <div>
                                <span id="tags-label">TAGS</span>
                                <span class="quiz-add-btn" onClick={onClickAddTag} />
                                { quizData.tags &&
                                    quizData.tags.map((tag, idx) => {
                                        return (
                                            <TagMaker
                                                key={idx}
                                                index={idx}
                                                tag={tag}
                                            />
                                        );
                                    })
                                }
                            </div>
                            <div>
                                <StyledButton
                                    variant='b-mediumBlue'
                                    onClick={onClickSave}
                                >Save</StyledButton>
                                <StyledButton
                                    variant='b-mediumBlue'
                                    onClick={onClickPublish}
                                >Publish</StyledButton>
                            </div>

                            <div>
                                <p onBlur={updateDesc} contentEditable suppressContentEditableWarning={true}>{quizData.description}</p>
                            </div>
                            <div>
                                <div>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            onChange={toggleRandomizeQuestions}
                                            checked={quizData.randomizeQuestions}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="quiz-toggle-label">Randomize Order of Questions</span>
                                </div>
                                <div>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            onChange={toggleComments}
                                            checked={quizData.allowComments}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="quiz-toggle-label">Comment Section</span>
                                </div>
                            </div>
                            <div>
                                {/* discard current changes */}
                                <StyledButton
                                    variant='b-mediumBlue'
                                    onClick={onClickCancel}
                                >Cancel</StyledButton>

                                {/* destroy quiz in database */}
                                <StyledButton
                                    variant='b-mediumBlue'
                                    onClick={onClickDelete}
                                >Delete</StyledButton>
                            </div>
                        </div>
                        <div>
                            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                                {quizData.results &&
                                    quizData.results.map((result, idx) => {
                                        return <ResultMaker
                                            key={idx}
                                            index={idx}
                                            result={result}
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
                                    index={idx}
                                    question={question}
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
        </QuizMakerContext.Provider>
    );
}

export default QuizMaker;