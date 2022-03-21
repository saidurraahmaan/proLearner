import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import BugReportIcon from "@mui/icons-material/BugReport";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import {Link} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {getUser} from "../helpers";
import CardActions from "@mui/material/CardActions";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';



const AllPost = ()=>{
    const [posts,setPosts] = useState([]);

    //fetching user all posts
    useEffect(() => {
        const fetchPost = () => {
            axios
                .get('/api/post')
                .then(res => {
                    setPosts(res.data);
                })
        }
        fetchPost();
    }, [])

    return(
        <div className='content-margin'>
            <>
                <Card sx={{minWidth: 275, my: 0, mx: 45}} className='content-margin'>
                    <Container maxWidth="sm">

                        <CardContent>
                            <Typography m={3} variant="h5" alignItems='center' style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <ViewStreamIcon color='secondary' sx={{mr: 2}}/>

                                Post
                                <Button
                                    sx={{ml:20,fontSize:20}}
                                    to={`/add/post`}
                                    component={Link}
                                >
                                    <AddCircleOutlineSharpIcon color='secondary'/>
                                </Button>
                            </Typography>
                            <List sx={{width: '100%', backgroundColor: 'background.paper'}}>
                                {posts.length && posts.map((p,index) => (
                                    <Typography key={p._id}>
                                        <Button to={`/community/post/${p._id}`} component={Link}> <LiveHelpIcon sx={{mx:2}}/> {p.title}</Button>
                                    </Typography>
                                ))}
                            </List>
                        </CardContent>
                    </Container>
                </Card>
            </>
        </div>
    )
}

export default AllPost;