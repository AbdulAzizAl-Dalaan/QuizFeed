import './QuizList.css'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import QuizListItem from './QuizListItem';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default function ListOrder(def=function(a, b) {return 0}) {
    
    function DropdownItemClick(item) {
        var order = document.getElementById('order');
        order.innerText = item.innerText;
        order.src = item.src;
    }

    function byTitle(a, b) {
        if(a.title > b.title)
        {
            return -1;
        }
        if(a.title < b.title)
        {
            return 1;
        }
        return 0; 
    }

    function byPopularity(a, b) {
        if(a.approval > b.approval)
        {
            return -1;
        }
        if(a.approval < b.approval)
        {
            return 1;
        }
        return 0; 
    }

    function byUsername(a, b) {
        if(a.creatorUsername > b.creatorUsername)
        {
            return -1;
        }
        if(a.creatorUsername < b.creatorUsername)
        {
            return 1;
        }
        return 0; 
    }

    

    return (
        <Container className="mt-2">
            <div class='row'>
                <div class='col-4 list-header-text'>Order by:</div>
                <div class='col-6'>
                <Dropdown>
                    <Dropdown.Toggle>
                        <span id='order' src={ def }>Filter</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target)} src={ byTitle }>Title</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target)} src={ byPopularity }>Popularity</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target)} src={ byUsername }>Username</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </Container>

    )
}