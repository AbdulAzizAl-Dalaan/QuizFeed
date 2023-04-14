import React from 'react';
import { useParams } from 'react-router-dom';

export default function QuizDisplay() {
    const urlParams = useParams();
    const [resultData, setResultData] = React.useState();

    // Load the results
    React.useEffect(() => {
        fetch('/quiz/' + urlParams.id + '/' + urlParams.result)
            .then(res => res.json())
            .then(data => {
                setResultData(data);
                console.log(data);
            });
    }, [urlParams]);

    return (
        <div>
            {resultData &&
                <div>
                    <h1>{resultData.title}</h1>
                    <h2>{resultData.description}</h2>
                </div>
            }
        </div>);
}