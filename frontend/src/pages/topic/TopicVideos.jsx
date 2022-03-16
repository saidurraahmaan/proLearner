import React, {useEffect, useState} from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardActions from "@mui/material/CardActions";
import YoutubeEmbedded from "../../components/YoutubeEmbedded";
import axios from "axios";
import {useParams} from "react-router-dom";


const TopicVideos = ({videos}) => {

    return (

        <>

            <Card sx={{minWidth: 275, my: 0, mx: 5}}>
                <CardContent sx={{textAlign: 'center'}}>
                    <YoutubeEmbedded id={videos}/>
                </CardContent>
                <CardActions>
                    {/*<Button size="small">Learn More</Button>*/}
                </CardActions>
            </Card>


        </>
    )
}

export default TopicVideos;
