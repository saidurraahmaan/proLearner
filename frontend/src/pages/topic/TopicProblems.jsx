import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BugReportIcon from '@mui/icons-material/BugReport';
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewStreamIcon from "@mui/icons-material/ViewStream";


const TopicProblems = () => {
    const [problems, setProblems] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    //api/ problem/all/:id
    //Fetching all problems
    useEffect(() => {
        let mount = true;
        const fetchProblems = async () => {
            const {data} = await axios.get(`/api/problem/all/${id}`);
            if (mount) {
                setProblems(data);
            }
        }
        fetchProblems();
        return () => {
            mount = false;
        }
    }, [id])
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 15}}>
                <Container maxWidth="sm">
                    <CardContent>
                            <Typography m={3} variant="h5" alignItems='center' style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <ViewStreamIcon color='secondary' sx={{mr: 2}}/>

                                Problem List
                                <Button
                                    sx={{ml:20,fontSize:20}}
                                    to={`/add/post`}
                                    component={Link}
                                >
                                    <AddCircleOutlineSharpIcon color='secondary'/>
                                </Button>
                            </Typography>
                        <List sx={{width: '100%', backgroundColor: 'background.paper'}}>
                            {problems.length && problems.map((p) => (
                                <ListItemButton key={p._id} to={`/problem/${p._id}`} component={Link}>
                                    <BugReportIcon sx={{mx:1}}/>
                                    <ListItemText sx={{ml:1}}  primary={p.title}/>
                                </ListItemButton>
                            ))}
                        </List>

                    </CardContent>
                </Container>
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

export default TopicProblems;
