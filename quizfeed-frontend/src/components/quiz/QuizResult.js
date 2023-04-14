import React from 'react';
import { useParams } from 'react-router-dom';
import QuizInfo from './QuizInfo';

// Displays the results page for a quiz, and does so in a way that allows for the url to be shared and it works
export default function QuizDisplay() {
    const urlParams = useParams();
    const [quizData, setQuizData] = React.useState();
    const [resultData, setResultData] = React.useState();

    // Load the results
    React.useEffect(() => {
        fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
                setResultData(data.results[urlParams.result - 1]);
            });
    }, [urlParams]);

    return (
        <div>
            {quizData &&
                <div>
                    <QuizInfo quizData={quizData} />
                    <h1>{resultData.title}</h1>
                    <h2>{resultData.description}</h2>
                </div>
            }
        </div>);
}