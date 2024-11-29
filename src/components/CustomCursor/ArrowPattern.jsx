import React from 'react';
import './ArrowPattern.css';

const ArrowPattern = () => {
    return (
        <div className='arrow-pattern'>
            <svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
                <polygon points='50,0 100,50 50,100 0,50' fill='black' />
            </svg>
        </div>
    );
};

export default ArrowPattern;
