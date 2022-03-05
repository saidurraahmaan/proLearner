import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Topic from './Topic'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const {id} = useParams();

    //Fetching all topics
    useEffect(() => {
        const fetchTopics = async () => {
            const {data} = await axios.get(`/api/topic/all/${id}`);
            setTopics(data);
        }
        fetchTopics();
    }, [])

    return (
        <div className='body topic-margin'>
            <Grid container
                  spacing={12}
                  alignItems="center"
                  justifyContent="center"
                  justify="space-around"
                  style={{minHeight: '100vh',backgroundColor:'white'}}
            >
                <Grid item xs={6} sm={9}>

                    {topics.map((item, i) => (
                        <Topic
                            key={i}
                            index={i}
                            topic={item}
                        />
                    ))}

                </Grid>
            </Grid>
            <Card>
                <Button
                    to={`/add/topic/${id}`}
                    component={Link}
                    variant="contained"
                    color="secondary"
                    sx={{m:1}}
                >
                    <AddCircleOutlineSharpIcon/>
                </Button>
            </Card>


        </div>
    )
}
export default TopicList;