import './Question.css'; // .q-darkBlue, .q-mediumBlue
import './QuizMaker.css';
import React, {createContext} from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import QuestionMaker from './QuestionMaker';
import ResultMaker from './ResultMaker';
import StyledButton from '../StyledButton';

export const QuizMakerContext = createContext();

// todo: pass in initial values for quiz - will allow editing
/*
* QuizMaker
* quiz: Initial quiz data
*/
function QuizMaker({ quiz }) {
    let [quizData, setQuizData] = React.useState(quiz);
    const navigate = useNavigate();

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

    // function onClickAddTag(e) {
    // }

    function onClickPublish(e) {
        saveQuiz({...quizData, publishedAt: Date.now()});
    }

    function onClickSave(e) {
        saveQuiz(quizData);
    }

    function onClickDelete(e) {
        // has id: exists in database and must be deleted from database
        if (quizData.id !== null)
        {
            deleteData(`/quiz/${quizData.id}`)
            .then((res)=>{console.log(res)})
            .then(navigate("/"))
            .catch((err)=>console.log(err));
        }
    }

    function onClickCancel(e) {
        navigate("/");
    }

    function onClickAddResult(e) {
        e.preventDefault();
        let result = (i) => ({
            "title": `Result ${i}`,
            "description": "Description"
        });
        let questions = quizData.questions.map((q_v) => {
            let c = q_v.choices.map((c_v) => {
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
        let question = {
            "text": "Question?",
            "variant": "q-darkBlue",
            "choices": [
              { "text": "Option 1", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
              { "text": "Option 2", "variant": "b-mediumBlue", "points": quizData.results.map((_)=>{return 0}) },
            ]
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
                                <p>TAGS</p>
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

QuizMaker.defaultProps = {
    quiz: {
        // TODO: replace fake username with user's genuine username
        creatorUsername: "generic", // fake username so we can post
        title: "Title",
        description: "Description",
        questions: [],
        results: []
    }
};

export default QuizMaker;