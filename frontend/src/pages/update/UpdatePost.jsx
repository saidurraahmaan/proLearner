import React, {useEffect, useState} from 'react';
import '../add/FormStyle.css';
import {useParams} from 'react-router-dom'
import {CKEditor} from 'ckeditor4-react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import HTMLReactParser from "html-react-parser";
import Typography from "@mui/material/Typography";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getUser } from '../helpers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'

const UpdatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const {id} = useParams();
    let navigate = useNavigate();

    //Fetching single topic
    useEffect(() => {
        const fetchTopic = async () => {
            const {data} = await axios.get(`/api/post/${id}`);
            setTitle(data.title);
            setContent(data.content);
        }
        fetchTopic();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        const res = await axios.put(`/api/post/${id}`, {
            title, content
        }, { headers: { Authorization: `Bearer ${getUser().data.token}` } });
        navigate(-1);
    }
    
    return (
        <div className='content-margin'>
            <Card sx={{minWidth: 275, my: 0, mx: 40}}>
                <Container maxWidth="md">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{marginBottom: "10px",textAlign:'center'}}>Update the post</h1>
                            <Typography >
                                Title
                                <input
                                    className="input"
                                    name="topicName"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required/>
                            </Typography>
                            <div className="input" style={{margin: "2px"}}>
                                Content
                                {content &&
                                    <CKEditor

                                        editor={ClassicEditor}
                                        initData={content}
                                        onChange={(e) => {
                                            const data = e.editor.getData();

                                            setContent(data);
                                        }}
                                    />
                                }
                            </div>

                            <button className='button'>Update Post</button>
                        </form>
                    </CardContent>
                </Container>
                <Card>
                    <Button
                        onClick={()=>navigate(-1)}
                        variant="contained"
                        color="warning"
                        sx={{ m: 1 }}
                    >
                        < ArrowBackIcon/>
                    </Button>
                </Card>
            </Card>
        </div>
    );
}

export default UpdatePost;