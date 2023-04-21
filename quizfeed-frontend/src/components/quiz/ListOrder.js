import './QuizList.css'
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

export default function ListOrder({update}) {
    
    function DropdownItemClick(item, orderFunction) {
        var order = document.getElementById('orderDropdownText');
        order.innerText = item.innerText;
        update(orderFunction);
    }

    function byTitle(a, b) {
        if(a[0].title > b[0].title)
        {
            return 1;
        }
        if(a[0].title < b[0].title)
        {
            return -1;
        }
        return 0; 
    }

    function byPopularity(a, b) {
        console.log(a);
        if(a[0].approval > b[0].approval)
        {
            return -1;
        }
        if(a[0].approval < b[0].approval)
        {
            return 1;
        }
        return 0; 
    }

    function byUsername(a, b) {
        if(a[0].creatorUsername > b[0].creatorUsername)
        {
            return 1;
        }
        if(a[0].creatorUsername < b[0].creatorUsername)
        {
            return -1;
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
                        <span id='orderDropdownText'>Order</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, () => byTitle)}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, () => byPopularity)}>Popularity</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, () => byUsername)}>Username</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </Container>

    )
}