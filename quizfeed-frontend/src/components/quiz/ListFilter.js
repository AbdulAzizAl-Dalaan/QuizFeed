import './QuizList.css'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default function ListFilter(def='') {
    
    function DropdownItemClick(item) {
        var filterText = document.getElementById('filterText').innerText;
        filterText = item;
    }

    return (
        <Container className="mt-2">
            <div class='row'>
                <div class='col-4 list-header-text'>Filter by:</div>
                <div class='col-6'>
                <Dropdown>
                    <Dropdown.Toggle id='filterText'>Filter</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick('Alphabetical')}>Alphabeticl</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target.value)}>Popularity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </Container>

    )
    /*
    <Grid spacing={2}>
                    <Grid item xs={4}>
                        <div>Filter by:</div>
                    </Grid>
                    <Grid item xs={8}>
                        <Dropdown>
                            <Dropdown.Toggle>Filter</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Alphabetical</Dropdown.Item>
                                <Dropdown.Item>Popularity</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                </Grid>
                */
}