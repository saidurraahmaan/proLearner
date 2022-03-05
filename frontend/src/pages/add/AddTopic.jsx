import React, {useState} from 'react';
import './FormStyle.css';
import { useParams} from 'react-router-dom'
import { CKEditor } from 'ckeditor4-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";



let topicData = {
    languageId: "",
    title: "",
    content: "",
    video: ""
}

const AddTopic = () => {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [content, setContent] = useState("");
    const {id} = useParams();
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        topicData = {
            languageId: id,
            title: title,
            content: content,
            video: video,
        }
        console.log(topicData);
        const res = await axios.post(`/api/topic/all/${id}`, {
            topicData
        })
        navigate("/languages");
    }
    console.log(content)
    return (
        <div className='first-margin-language'>
            <Card sx={{minWidth: 275, my: 0, mx: 5}}>
                <Container maxWidth="md">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{marginBottom: "10px",textAlign:'center'}}>Create A Topic</h1>
                            <div>
                                Topic Name:
                                <input
                                    className="input"
                                    name="topicName"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required/>
                            </div>
                            <div className="input" style={{margin: "2px"}}>
                                Topic Content

                                <CKEditor

                                    editor={ClassicEditor}
                                    initData={content}
                                    // onReady={editor => {
                                    //     editor.editing.view.change(writer => {
                                    //         writer.setStyle('height', '450px', editor.editing.view.document.getRoot());
                                    //     });
                                    // }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setContent(data);
                                    }}
                                />

                            </div>
                            <div>
                                YouTube Key
                                <input
                                    className="input"
                                    name="ytLink"
                                    type="text"
                                    value={video}
                                    onChange={e => setVideo(e.target.value)}

                                    required/>
                            </div>


                            <button>Add New Topic</button>
                        </form>
                    </CardContent>
                </Container>
            </Card>
        </div>
    );
}

export default AddTopic;