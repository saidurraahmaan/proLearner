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
        // <Box
        // >
        //     <AppBar sx={{
        //         backgroundColor:"#0d0d0c",
        //     }} position="static">
        //         <Toolbar className="justify-between" sx={{mx:20}} >
        //             <Link to="/">
        //                 <Logo className="logo" />
        //             </Link>
        //             <div className="flex justify-between gap-4">
        //                 <Button color="inherit" to="/languages" component={Link} variant="outlined">
        //                     Languages
        //                 </Button>
        //
        //                 <Button to="/login" color="inherit" component={Link} variant="outlined">
        //                     Login
        //                 </Button>
        //                 <Button to="/register" color="inherit" component={Link} variant="outlined">
        //                     Register
        //                 </Button>
        //             </div>
        //         </Toolbar>
        //     </AppBar>
        // </Box>
    );
};