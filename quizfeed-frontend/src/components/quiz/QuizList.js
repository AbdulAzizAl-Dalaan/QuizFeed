import './QuizList.css'
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import ListOrder from './ListOrder';

export default function QuizList({defaultOrder = (a, b) => {return 0}}) {
    const [quizData, setQuizData] = React.useState();
    const [order, setOrder] = React.useState(() => defaultOrder);

    React.useEffect(() => {
        fetch('/quiz')
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
            });
    }, []);

    console.log(order);
    let quizListItems=quizData?.map(quiz => {
        return [quiz, <QuizListItem quizData={quiz} />]
    }).sort(order);

    let quizListItemElements = quizListItems?.map(quizItem => {
        return quizItem[1];
    });

    function resort(newOrder) {
        setOrder(newOrder);
        console.log(order);
    }

    return (
        <Container>
            <Container className="list-header mt-3 pb-3">
                <div class="row list-header">
                    <div class='col'>
                        <h3 class='list-header-text'>Title</h3>
                    </div>
                    <div class='col-3'><ListOrder id='order' update={resort}/></div>
                </div>
            </Container>
            <Container className="list-background">
                {quizData && 
                    <Stack>
                    {quizListItemElements}
                    </Stack>
                }
            </Container>
        </Container>

    )
}