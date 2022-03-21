import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import BugReportIcon from '@mui/icons-material/BugReport';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getUser} from "../helpers";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

const MyProblemList = ()=>{

    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();
    const handleDelete=(e,id)=>{
        e.preventDefault();

        axios
            .delete(`/api/problem/delete/${id}`,{headers: {"Authorization": `Bearer ${getUser().data.token}`}})
            .then(res=>{
                alert('Topic Deleted');
                navigate(-1);
            })
    }
    //fetching user all topics
    useEffect(() => {
        const fetchTopic = () => {
            axios
                .get('/api/problem/list/my', {headers: {"Authorization": `Bearer ${getUser().data.token}`}})
                .then(res => {
                    setProblems(res.data);
                })
        }
        fetchTopic();
    }, [])

    return (
        <>
            <Grid item xs={6}>
                <AppBar position="static" color="inherit">
                    <Typography m={3} variant="inherit" alignItems='center' style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <BugReportIcon color='secondary' sx={{mr: 2}}/>
                        My Problem List
                    </Typography>
                </AppBar>
                <Card variant="outlined">
                    <Typography my={3}>
                    </Typography>
                    <List sx={{width: '100%', backgroundColor: 'background.paper', m: 2}}>
                        {problems.length && problems.map((p) => (
                            <ListItemButton key={p._id} to={`/problem/${p._id}`} component={Link}>
                                <ListItemText primary={p.title}/>
                                <Button

                                    variant='outlined'
                                    color='success'
                                    size='small'
                                    sx={{mx: 1}}
                                    to={`/update/problem/${p._id}`}
                                    component={Link}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='error'
                                    size='small'
                                    sx={{mx: 1, mr: 1}}
                                    onClick={(e)=>handleDelete(e,p._id)}
                                >
                                    Delete
                                </Button>

                            </ListItemButton>


                        ))}
                    </List>
                </Card>
            </Grid>
        </>
    )
}

export default MyProblemList;