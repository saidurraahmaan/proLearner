import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {CardContent, Container} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import Divider from '@mui/material/Divider';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import CommentsBlock from "simple-react-comments";
import {getUser} from "../helpers";
import Grid from "@mui/material/Grid";
import HTMLReactParser from "html-react-parser";


const Post = () => {

    const [post, setPost] = useState("<p>welcome</p>")
    const [author, setAuthor] = useState("");
    const [com, setCom] = useState([]);
    const [comments, setComments] = React.useState([]);

    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(text) {
        axios
            .post(`/api/post/comment/${id}`, {comment: text}, {headers: {"Authorization": `Bearer ${getUser().data.token}`}})
            .then(res => {
                navigate(0);
            })
    }

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await axios.get(`/api/post/${id}`)
            setPost(data);
            setCom(data.comments);
            axios
                .get(`/api/user/getUser/${data.userId}`)
                .then(res => setAuthor(res.data.name));
        }
        fetchPost();
    }, [])

    return (
        <div className='content-margin'>
            <Container>
                {
                    post.content &&
                    <Card sx={{minWidth: 275, my: 0, mx: 20}}>

                        <Typography m={3} variant="h5" alignItems='center' style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <ViewStreamIcon color='secondary' sx={{mr: 2}}/>
                            {post.title}
                        </Typography>
                        <Typography m={3} variant="subtitle2" alignItems='center' style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <PermIdentitySharpIcon color='secondary' sx={{mr: 2}}/>
                            {author.split(' ')[0]}
                        </Typography>

                        <CardContent sx={{mx: 6}}>
                            <Typography variant='string'>
                                {HTMLReactParser(post.content)}
                            </Typography>
                        </CardContent>
                    </Card>
                }

                <Divider sx={{mx: 20, my: 2}}/>

                <Card sx={{minWidth: 275, my: 0, mx: 28}}>

                    <Typography m={3} variant="h5" alignItems='center' style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <CommentBankIcon color='secondary' sx={{mr: 2}}/>
                        Comments
                    </Typography>


                    {com.length ? com.map((c) => (
                        <Grid key={c._id} container>
                            <Grid item xs={3}>
                                <Typography m={3} variant="subtitle2" alignItems='center' style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <PermIdentitySharpIcon color='secondary' sx={{fontSize: 30}}/>
                                    {c.name.split(' ')[0]}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <span
                                        style={{
                                            marginTop: '10px',
                                            fontSize: '10px'
                                        }}
                                    >
                                        {`${(new Date(c.createdAt)).getDate()} - ${(new Date(c.createdAt)).getMonth()} - ${(new Date(c.createdAt)).getFullYear()}`}
                                    </span>
                                    {c.comment}
                                </CardContent>

                            </Grid>
                        </Grid>
                    )) : (
                        <span style={{fontSize: '10px', margin: '10px', padding: '5px'}}> No comments yet</span>
                    )
                    }

                    <Typography sx={{m: 2}} style={{textAlign: 'center'}} component={'span'}>
                        <CommentsBlock
                            comments={comments}
                            signinUrl={'/signin'}
                            isLoggedIn={getUser()}
                            onSubmit={(text) => {
                                if (text.length > 0) {
                                    handleSubmit(text);
                                }
                            }}
                        />
                    </Typography>
                </Card>
            </Container>
        </div>
    )
}

export default Post;