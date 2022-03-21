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


const UpdatePost = () => {

    let [topicContent, setTopicContent] = useState({
        title: "",
        content: ""
    });
    const [postData, setPostData] = useState('');

    const {id} = useParams();
    let navigate = useNavigate();

    //Fetching single topic
    useEffect(() => {
        const fetchTopic = async () => {
            const {data} = await axios.get(`/api/post/${id}`);
            setTopicContent(data);
            setPostData(data.content);
        }
        fetchTopic();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        topicContent = {
            ...topicContent,
            content: postData
        }
        const {title, content} = topicContent;

        const res = await axios.put(`/api/post/${id}`, {
            title, content
        })
        navigate(-1);
    }
    return (
        <div className='content-margin'>
            <Card sx={{minWidth: 275, my: 0, mx: 40}}>
                <Container maxWidth="md">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{marginBottom: "10px",textAlign:'center'}}>Create A Post</h1>
                            <Typography >
                                Title
                                <input
                                    className="input"
                                    name="topicName"
                                    type="text"
                                    value='t'
                                    onChange={e => setPostData(e.target.value)}
                                    required/>
                            </Typography>
                            <div className="input" style={{margin: "2px"}}>
                                Content
                                <CKEditor

                                    editor={ClassicEditor}
                                    initData='hi'
                                    onChange={(e) => {
                                        const data = e.editor.getData();

                                        setPostData(data);
                                    }}
                                />
                            </div>

                            <button className='button'>Add New Post</button>
                        </form>
                    </CardContent>
                </Container>
            </Card>
        </div>
    );
}

export default UpdatePost;