import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

export const Header = () => {
    return (
        <div id='main' >
            <div className='name'>
                <h1><span>Learn To Code</span></h1>
                <p className='details'>Learn programming with  fun</p>
                <a href='#' className='cv-btn'>Let's learn</a>
            </div>
        </div>

    );
};