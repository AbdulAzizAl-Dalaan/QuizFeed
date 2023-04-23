import './QuizList.css'
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

//small => large
function defaultOrderFunction(a, b, key) {
    console.log(a);
    if(a[key] > b[key])
    {
        return 1;
    }
    if(a[key] < b[key])
    {
        return -1;
    }
    return 0; 
}

//large => small
function inverseOrder(a, b, key) {
    if(a[key] > b[key])
    {
        return -1;
    }
    if(a[key] < b[key])
    {
        return 1;
    }
    return 0; 
}

function ListOrder({updateFunction, updateKey}) {
    
    function DropdownItemClick(item, orderKey, orderFunction=defaultOrderFunction) {
        var order = document.getElementById('orderDropdownText');
        order.innerText = item.innerText;
        updateFunction(() => orderFunction);
        updateKey(orderKey)
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
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, 'title')}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, 'approval', inverseOrder)}>Popularity</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => DropdownItemClick(menuItem.target, 'creatorUsername')}>Username</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </Container>

    )
}

export {ListOrder, defaultOrderFunction};