import { Link } from "react-router-dom";
import React from "react";


export const Header = () => {
    return (
        <div id='main' >
            <div className='name'>
                <h1><span>Learn To Code</span></h1>
                <p className='details'>Learn programming with  fun</p>
                <Link to='/languages' className='cv-btn'>Let's learn</Link>
            </div>
        </div>

    );
};