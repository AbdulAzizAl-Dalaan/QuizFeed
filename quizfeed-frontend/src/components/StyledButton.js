import './StyledButton.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

/*
 * Custom styled button
 * redirectPath: When clicked, what page to go to (default is '/')
 * onClick: Instead of simply redirecting, call a function when clicked (default is 'none')
 * variant: Style of button (available styles include b-mediumBlue and b-lightBlue) (default is b-mediumBlue)
 * size: Size of button (default is lg)
 * disable: Whether the button is disabled (default is false)
 * 
 * Example:
 * <StyledButton redirectPath={'/test'} disabled={true}>Test Label</StyledButton>
 */
function StyledButton({ redirectPath, onClick, variant, size, disabled, children }) {
    const navigate = useNavigate();

    function redirect() {
        navigate(redirectPath);
    }

    return (
        <Button
            className={variant}
            size={size}
            onClick={onClick === 'none' ? redirect : onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

StyledButton.defaultProps = {
    children: 'Button',
    redirectPath: '/',
    onClick: 'none',
    variant: 'b-mediumBlue',
    size: 'lg',
    disabled: false,
}

export default StyledButton;