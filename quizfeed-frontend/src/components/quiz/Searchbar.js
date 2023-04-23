import './QuizList.css'
import {React, TextField} from 'react';

export default function Searchbar({key='title', updateKey, updateValue}){
    function searchResults(input){
        updateKey(key)
        updateValue(input.value)
    }
    
    return (
        <div>
            <TextField id="standard-basic" label="Search" variant="standard" onChange={e => searchResults(e.target)} />
        </div>
    );
}