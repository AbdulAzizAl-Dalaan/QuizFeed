import './QuizList.css'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import ListFilter from './ListFilter';
import ListOrder from './ListOrder';

function byPopularity(a, b) {
    if(a.approval > b.approval)
    {
        return 1;
    }
    if(a.approval < b.approval)
    {
        return -1;
    }
    return 0; 
}

export default function QuizList({order = (a, b) => {return 0}}) {
    const navigate = useNavigate();
    const [quizData, setQuizData] = React.useState();

    React.useEffect(() => {
        fetch('/quiz')
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
            });
    }, [order]);

    console.log(order)

    let quizListItems=quizData?.map(quiz => 
    {
        return <QuizListItem quizData={quiz} />
    }).sort(byPopularity)

    function resort(newOrder) {
        order = newOrder;
        /*
        quizListItems=quizData?.map(quiz => 
        {
            return <QuizListItem quizData={quiz} />
        }).sort(newOrder);
        */
    }

    return (
        <Container>
            <Container className="list-header mt-3 pb-3">
                <div class="row list-header">
                    <div class='col'>
                        <h3 class='list-header-text'>Title</h3>
                    </div>
                    <div class='col-3'><ListOrder id='order' def={order} update={resort}/></div>
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