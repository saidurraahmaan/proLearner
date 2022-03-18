import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import TopicIcon from '@mui/icons-material/Topic';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUser} from "../helpers";
import ListItemButton from "@mui/material/ListItemButton";
import {Link, useNavigate} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

const MyTopicList = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    const handleDelete=(e,id)=>{
        e.preventDefault();

        axios
            .delete(`/api/topic/delete/${id}`,{headers: {"Authorization": `Bearer ${getUser().data.token}`}})
            .then(res=>{
                alert('Topic Deleted');
                navigate(-1);
            })
    }
    //fetching user all topics
    useEffect(() => {
        const fetchTopic = () => {
            axios
                .get('/api/topic/list/my', {headers: {"Authorization": `Bearer ${getUser().data.token}`}})
                .then(res => {
                    setTopics(res.data);
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
                        <TopicIcon color='secondary' sx={{mr: 2}}/>
                        My Topic List
                    </Typography>
                </AppBar>
                <Card variant="outlined">
                    <Typography my={3}>
                    </Typography>
                    <List sx={{width: '100%', backgroundColor: 'background.paper', m: 2}}>
                        {topics.length && topics.map((p) => (
                            <ListItemButton key={p._id} to={`/topic/${p._id}`} component={Link}>
                                <ListItemText primary={p.title}/>
                                <Button

                                    variant='outlined'
                                    color='success'
                                    size='small'
                                    sx={{mx: 1}}
                                    to={`/update/topic/${p._id}`}
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

export default MyTopicList;

