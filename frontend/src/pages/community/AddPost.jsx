import React, {useState} from 'react';
import '../add/FormStyle.css';
import { CKEditor } from 'ckeditor4-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import {getUser} from "../helpers";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



let postData = {
    title: "",
    comment: "",
}

const AddPost = ()=> {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`/api/post`, {title,content:comment},{headers: {"Authorization": `Bearer ${getUser().data.token}`}})
            .then(res=>{
                navigate(-1);
            })
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
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required/>
                            </Typography>
                            <div className="input" style={{margin: "2px"}}>
                                Content
                                <CKEditor

                                    editor={ClassicEditor}
                                    initData={comment}
                                    onChange={(e) => {
                                        const data = e.editor.getData();

                                        setComment(data);
                                    }}
                                />
                            </div>

                            <button className='button'>Add New Post</button>
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

export default AddPost;