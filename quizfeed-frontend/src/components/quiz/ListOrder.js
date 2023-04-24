import './QuizList.css'
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

//small => large
function defaultOrder(a, b, key) {
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
    
    function dropdownItemClick(item, orderKey, orderFunction=defaultOrder) {
        var order = document.getElementById('orderDropdownText');
        order.innerText = item.innerText;
        updateFunction(() => orderFunction);
        updateKey(orderKey)
    } 

    return (
        <Container className="mt-2">
            <div class='row'>
                <div class='col-4 list-header-text'>Select:</div>
                <div class='col-8'>
                <Dropdown>
                    <Dropdown.Toggle>
                        <span id='orderDropdownText'>Order</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'title')}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'creatorUsername')}>Username</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'takenNum', inverseOrder)}>Traffic</Dropdown.Item>
                        <Dropdown.Item onClick={menuItem => dropdownItemClick(menuItem.target, 'likes', inverseOrder)}>Popularity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </Container>

    )
}

export {ListOrder, defaultOrder, inverseOrder};