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


const UpdateTopic = () => {

    let [topicContent, setTopicContent] = useState({
        languageId: "",
        title: "",
        content: "",
        video: "",
    });
    const [contentData, setContentData] = useState('');

    const {id} = useParams();
    let navigate = useNavigate();

    //Fetching single topic
    useEffect(() => {
        const fetchTopic = async () => {
            const {data} = await axios.get(`/api/topic/${id}`);
            setTopicContent(data);
            setContentData(data.content);
        }
        fetchTopic();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        topicContent = {
            ...topicContent,
            content: contentData
        }
        const {languageId, title, content, video} = topicContent;

        const res = await axios.put(`/api/topic/update/${id}`, {
            languageId, title, content, video
        })
        navigate("/languages");
    }
    return (
        <div className='content-margin'>
            <Card sx={{minWidth: 275, my: 0, mx: 5}}>
                <Container maxWidth="md">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{marginBottom: "10px", textAlign: 'center'}}>Update Topic</h1>
                            <div>
                                Topic Name:
                                <input
                                    className="input"
                                    name="topicName"
                                    type="text"
                                    value={topicContent.title}
                                    onChange={e => setTopicContent({...topicContent, title: e.target.value})}
                                    required/>
                            </div>
                            <div className="input" style={{margin: "2px"}}>
                                Topic Content

                                {contentData &&
                                <CKEditor
                                    type='classic'
                                    config={{
                                        extraPlugins: "justify, colorbutton, font",
                                    }}
                                    initData={HTMLReactParser(contentData)}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setContentData(data);
                                    }}
                                />}

                            </div>
                            <div>
                                YouTube Key
                                <input
                                    className="input"
                                    name="ytLink"
                                    type="text"
                                    value={topicContent.video}
                                    onChange={e => setTopicContent({...topicContent, video: e.target.value})}

                                    required/>
                            </div>

                            <button>Update Topic</button>
                        </form>
                    </CardContent>
                </Container>
            </Card>
        </div>
    );
}

export default UpdateTopic;