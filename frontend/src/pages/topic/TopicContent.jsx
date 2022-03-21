import React from "react";
import {Link, useNavigate,} from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import {getUser} from "../helpers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const TopicContent = ({content, title, id}) => {
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 15}}>
                <CardContent sx={{p: 6}}>
                    <Typography sx={{fontSize: 28, fontWeight: "bold", mb: 2, textAlign: "center"}} color="primary"
                                gutterBottom>
                        {title}
                    </Typography>
                    <Typography sx={{m: 2}} component={'span'}>
                        {HTMLReactParser(content)}
                    </Typography>

                </CardContent>
                {
                    getUser() ? getUser().data.isAdmin && (

                        <CardActions>
                            <Button to={`/update/topic/${id}`} component={Link} size="small" variant='outlined'
                                    color='error'>Update Content</Button>
                        </CardActions>) : <></>
                }
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

export default TopicContent;