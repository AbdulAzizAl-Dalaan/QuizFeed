import './QuizList.css'
import React from 'react';
import {
    Alert,
    Container,
    Form,
    Button,
    FormControl,
    InputGroup,
  } from "react-bootstrap";

export default function Searchbar({key='title', updateKey, updateValue}){
    const [searchValue, setSearchValue] = React.useState("");
    
    function searchResults(input){
        setSearchValue(input.value);
        updateKey(key);
        updateValue(input.value);
    }
    
    return (
        <Form>
            <InputGroup className="mb-3 mt-2 ms-2">
            <FormControl
                id="content"
                type="text"
                required
                value={searchValue} // Set the value of the input to the message state variable
                onChange={(event) => searchResults(event.target)} // Set the message state variable to the value of the input
                placeholder="Search"
            />
            </InputGroup>
        </Form>
    );
}