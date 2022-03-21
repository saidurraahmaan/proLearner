import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardActions from "@mui/material/CardActions";
import YoutubeEmbedded from "../../components/YoutubeEmbedded";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const TopicVideos = ({videos}) => {
    const navigate = useNavigate();
    return (

        <>

            <Card sx={{minWidth: 275, my: 0, mx: 15}}>
                <CardContent sx={{textAlign: 'center'}}>
                    <YoutubeEmbedded id={videos}/>
                </CardContent>
                <CardActions>
                    {/*<Button size="small">Learn More</Button>*/}
                </CardActions>
                <Card>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="contained"
                        color="warning"
                        sx={{mx: 5, my: 1}}
                    >
                        < ArrowBackIcon/>
                    </Button>
                </Card>
            </Card>

        </>
    )
}

export default TopicVideos;
