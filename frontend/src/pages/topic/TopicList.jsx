import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Topic from './Topic'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import { getUser } from "../helpers";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    //Fetching all topics
    useEffect(() => {
        const fetchTopics = async () => {
            const {data} = await axios.get(`/api/topic/all/${id}`);
            setTopics(data);
        }
        fetchTopics();
    }, [])

    return (
        <div className='body content-margin'>
            <Grid container
                  spacing={12}
                  alignItems="center"
                  justifyContent="center"
                  justify="space-around"
                  style={{minHeight: '100vh', backgroundColor: 'white'}}
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

            {
                getUser() &&
                <Card>
                    <Button
                        to={`/add/topic/${id}`}
                        component={Link}
                        variant="contained"
                        color="secondary"
                        sx={{m: 1}}
                    >
                        <AddCircleOutlineSharpIcon/>
                    </Button>
                </Card>
            }
            <Card>
                <Button
                    onClick={() => navigate(-1)}
                    variant="contained"
                    color="warning"
                    sx={{ m: 1 }}
                >
                    < ArrowBackIcon />
                </Button>
            </Card>
        </div>
    )
}
export default TopicList;