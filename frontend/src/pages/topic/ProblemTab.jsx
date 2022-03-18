import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Solution from "./Solution";
import Problem from "./Problem";
import axios from "axios";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Submission from "./Submission";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";


const ProblemTab = () => {
    const [value, setValue] = useState('problem');
    const [problem, setProblem] = useState({
        _id: "",
        topicId: "",
        title: "",
        problemStatement: "",
        problemSampleInput: "",
        problemSampleOutput: "",
        additionalInput:"",
        additionalOutput:"",
        constraints: "",
        solutions: "",
    });
    const {id} = useParams();
    const {title, _id, topicId, problemStatement, problemSampleInput, problemSampleOutput,additionalInput,additionalOutput, constraints, solutions} = problem;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //api/ problem/:id
    //Fetching all problems
    useEffect(() => {
        const fetchProblems = async () => {
            const {data} = await axios.get(`/api/problem/${id}`);
            setProblem(data);
        }
        fetchProblems();
    }, [])

    return (
        <>
            <div className='content-margin'>
                <Box sx={{backgroundColor: 'inherit'}}>
                    <Tabs

                        sx={{mx: 40}}
                        value={value}
                        onChange={handleChange}
                        aria-label="wrapped label tabs example"
                        variant="fullWidth"
                        textColor="secondary"
                    >
                        <Tab
                            value="problem"
                            label="problem"
                        />
                        <Tab value="code-run" label="Submit code"/>
                        <Tab value="solution" label="solution"/>
                    </Tabs>

                    {value === 'problem' && problem && <Problem
                        title={title}
                        topicId={topicId}
                        problemStatement={problemStatement}
                        problemSampleInput={problemSampleInput}
                        problemSampleOutput={problemSampleOutput}
                        constraints={constraints}
                    />}
                    {value === 'code-run' && <Submission
                        input={problemSampleInput}
                        output={problemSampleOutput}
                        extraInput = {additionalInput}
                        extraOutput = {additionalOutput}
                        problemId={_id}
                    />}
                    {value === 'solution' && <Solution solutions={solutions}/>}
                </Box>
            </div>

        </>
    );
}
export default ProblemTab;
