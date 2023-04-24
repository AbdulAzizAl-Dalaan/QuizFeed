import './QuizList.css'
import React from 'react';
import {
    Form,
    FormControl,
    InputGroup,
    Dropdown
  } from "react-bootstrap";

export default function Searchbar({key='title', updateKey, updateValue}){
    const [searchValue, setSearchValue] = React.useState("");

    //updateKey(key);
    
    function searchResults(input){
        setSearchValue(input.value);
        updateValue(input.value);
    }

    function dropdownItemClick(input, searchKey) {
        document.getElementById('searchDropdownText').innerText = input.innerText;
        updateKey(searchKey);
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
                <Dropdown>
                    <Dropdown.Toggle>
                        <span id='searchDropdownText'>By</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'title')}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'creatorUsername')}>Username</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'description')}>Description</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>
        </Form>
    );
}