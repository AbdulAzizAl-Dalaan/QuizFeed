import './QuizList.css'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import ListFilter from './ListFilter';
import ListOrder from './ListOrder';

export default function QuizList() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = React.useState();

    React.useEffect(() => {
        fetch('/quiz')
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
            });
    }, []);

    

    let quizListItems=quizData?.map(quiz => 
    {
        return <QuizListItem quizData={quiz} />
    }).sort();

    return (
        <Container>
            <Container className="list-header mt-3 pb-3">
                <div class="row list-header">
                    <div class='col'>
                        <h3 class='list-header-text'>Title</h3>
                    </div>
                    <div class='col-3'><ListOrder id='order' /></div>
                </div>
            </Container>
            <Container className="list-background">
                {quizData && 
                    <Stack>
                    {quizListItems}
                    </Stack>
                }
            </Container>
        </Container>

    )
}