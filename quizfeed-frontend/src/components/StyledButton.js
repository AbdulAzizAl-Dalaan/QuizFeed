import './StyledButton.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/*
 * Custom styled button
 * redirectPath: When clicked, what page to go to (default is '/')
 * onClick: Instead of simply redirecting, call a function when clicked (default is 'none')
 * variant: Style of button (available styles include b-mediumBlue and b-lightBlue) (default is b-mediumBlue)
 * size: Size of button (default is lg)
 * disabled: Whether the button is disabled (default is false)
 * tooltip: *If disabled*, what to display as a tooltip for the button (default is no tooltip)
 * 
 * Example:
 * <StyledButton redirectPath={'/test'} disabled={true}>Test Label</StyledButton>
 */
function StyledButton({ redirectPath, onClick, variant, size, disabled, tooltip, children }) {
    const navigate = useNavigate();

    function redirect() {
        navigate(redirectPath);
    }

    return (
        <div>
            {disabled ?
                <OverlayTrigger overlay={<Tooltip id='tooltip'>{tooltip}</Tooltip>}>
                    <div>
                        <Button
                            className={variant ? variant : 'b-mediumBlue'}
                            size={size}
                            onClick={onClick === 'none' ? redirect : onClick}
                            disabled={disabled}
                            style={{ pointerEvents: 'none' }}
                        >
                            {children}
                        </Button>
                    </div>
                </OverlayTrigger >
                :
                <Button
                    className={variant ? variant : 'b-mediumBlue'}
                    size={size}
                    onClick={onClick === 'none' ? redirect : onClick}
                    disabled={disabled}
                >
                    {children}
                </Button>
            }
        </div>
    );
}

StyledButton.defaultProps = {
    children: 'Button',
    redirectPath: '/',
    onClick: 'none',
    variant: 'b-mediumBlue',
    size: 'lg',
    disabled: false,
    tooltip: '',
}

export default StyledButton;