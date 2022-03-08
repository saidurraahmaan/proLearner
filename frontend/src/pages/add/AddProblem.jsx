import React, {useState} from 'react';
import './FormStyle.css';
import {useParams} from 'react-router-dom'
import {CKEditor} from 'ckeditor4-react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";


let problemData = {
    topicId: "",
    title: "",
    problemStatement: "",
    problemSampleInput: "",
    problemSampleOutput: "",
    constraints: "",
    solutions: "",
}

const AddProblem = () => {
    const [title, setTitle] = useState("");
    const [problemStatement, setProblemStatement] = useState("");
    const [problemSampleInput, setProblemSampleInput] = useState("");
    const [problemSampleOutput, setProblemSampleOutput] = useState("");
    const [constraints, setConstraints] = useState("");
    const [solutions, setSolutions] = useState("");

    const {id} = useParams();
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        problemData = {
            topicId: id,
            title: title,
            problemStatement: problemStatement,
            problemSampleInput: problemSampleInput,
            problemSampleOutput: problemSampleOutput,
            constraints: constraints,
            solutions: solutions,
        }
        const res = await axios.post(`/api/problem/all/${id}`, {
            problemData
        })
        navigate("/languages");
    }

    return (
        <div className='first-margin-language'>
            <Card sx={{minWidth: 275, my: 0, mx: 5}}>
                <Container maxWidth="md">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{marginBottom: "10px", textAlign: 'center'}}>Create A Problem</h1>
                            <div>
                                Problem Name:
                                <input
                                    className="input"
                                    name="problemName"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required/>
                            </div>
                            <div className="input" style={{margin: "2px"}}>
                                Problem Statement:

                                <CKEditor
                                    initData={problemStatement}
                                    config={{
                                        extraPlugins: "justify, colorbutton, font",
                                    }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setProblemStatement(data);
                                    }}
                                />

                            </div>
                            <div className="input" style={{margin: "2px"}}>
                                Problem Constraints:

                                <CKEditor
                                    initData={constraints}
                                    config={{
                                        toolbarGroups: [{
                                            "name": "basicstyles",
                                            "groups": ["basicstyles"]
                                        },
                                            {
                                                "name": "links",
                                                "groups": ["links"]
                                            },
                                            {
                                                "name": "paragraph",
                                                "groups": ["list", "blocks"]
                                            },
                                            {
                                                "name": "document",
                                                "groups": ["mode"]
                                            },
                                            {
                                                "name": "insert",
                                                "groups": ["insert"]
                                            },
                                            {
                                                "name": "styles",
                                                "groups": ["styles"]
                                            }]
                                    }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setConstraints(data);
                                    }}
                                />
                            </div>
                            <div className="input" style={{margin: "2px"}}>
                                Problem Sample Input:

                                <CKEditor
                                    initData={problemSampleInput}
                                    config={{
                                        toolbar: [
                                            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
                                            { name: 'clipboard', items: [ 'Undo', 'Redo' ] }
                                        ],
                                    }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setProblemSampleInput(data);
                                    }}
                                />
                            </div>

                            <div className="input" style={{margin: "2px"}}>
                                Problem Sample Output:

                                <CKEditor
                                    initData={problemSampleOutput}
                                    config={{
                                        toolbar: [
                                            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
                                            { name: 'clipboard', items: [ 'Undo', 'Redo' ] }
                                        ],
                                    }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setProblemSampleOutput(data);
                                    }}
                                />
                            </div>

                            <div className="input" style={{margin: "2px"}}>
                                Solutions:
                                <CKEditor
                                    initData={solutions}
                                    config={{
                                        extraPlugins: "justify, colorbutton, font",
                                    }}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setSolutions(data);
                                    }}
                                />
                            </div>
                            <button className='button'>Add New Problem</button>
                        </form>
                    </CardContent>
                </Container>
            </Card>
        </div>
    );
}

export default AddProblem;