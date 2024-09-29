import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/TransitionWrapper.css'; // Create a CSS file for the transitions

const TransitionWrapper = ({ children }) => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="slide"
                timeout={300} // Duration of the transition
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default TransitionWrapper;

