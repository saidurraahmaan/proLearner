import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Tabs from "@mui/material/Tabs";
import LinkTab from '@mui/material/Tab';
import CardHeader from '@mui/material/CardHeader';


const TopicContent = ({content,title}) => {

    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 9}}>
                <CardContent>
                    <Typography sx={{fontSize: 28, fontWeight: "bold", mb: 2,textAlign:"center"}} color="primary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography sx={{m:2}} component={'span'}>
                        {HTMLReactParser(content)}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button to='/test' component={Link} size="small" variant='outlined' color='error' >Update Content</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default TopicContent;