import './QuizList.css'
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import {ListOrder, defaultOrderFunction} from './ListOrder';
import Searchbar from './Searchbar';

function defaultFilterFunction(item, key, value){
    if(key === '' || value === '')
    {
        return true;
    }
    if(item[key].includes(value))
    {
        return true;
    }
    return false;
}

export default function QuizList({title="heh list of kqs", 
    height=600, 
    customOrderFunction = defaultOrderFunction,
    customOrderKey = '',
    searchbar = false,
    customFilter = defaultFilterFunction, 
    customFilterKey = '', 
    customFilterValue = ''
    }) {
    const [quizData, setQuizData] = React.useState();
    const [orderFunction, setOrderFunction] = React.useState(() => customOrderFunction);
    const [orderKey, setOrderKey] = React.useState(customOrderKey);
    const [filterFunction, setFilterFunction] = React.useState(() => customFilter);
    const [filterKey, setFilterKey] = React.useState(customFilterKey);
    const [filterValue, setFilterValue] = React.useState(customFilterValue);

    React.useEffect(() => {
        fetch('/quiz')
            .then(res => res.json())
            .then(data => {
                setQuizData(data);
            });
    }, []);

    let quizListItems=quizData?.map(quiz => {
        return <QuizListItem quizData={quiz} />
    }).filter((item) => filterFunction(item.props.quizData, filterKey, filterValue))
    .sort((a, b) => orderFunction(a.props.quizData, b.props.quizData, orderKey));
    //<div class='col-3'><Searchbar updateKey={setFilterKey} updateValue={setFilterValue}/></div>
    return (
        <Container>
            <Container className="list-header mt-3 pb-3">
                <div class="row">
                    <div class='col'>
                        <h3 class='list-header-text' style={{margin: '5px'}}>{title}</h3>
                    </div>
                    <div class='col-3'><ListOrder id='order' updateFunction={setOrderFunction} updateKey={setOrderKey}/></div>
                    
                    
                </div>
            </Container>
            <div className="list-background" style={{height: height.toString() + "px"}}>
                {quizData && 
                    <Stack>
                    {quizListItems}
                    </Stack>
                }
            </div>
        </Container>
    );
}