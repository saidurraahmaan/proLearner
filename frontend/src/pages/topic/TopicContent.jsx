import React from "react";
import {Link, } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";



const TopicContent = ({content,title,id}) => {

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
                    <Button to={`/update/topic/${id}`} component={Link} size="small" variant='outlined' color='error' >Update Content</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default TopicContent;