import Tabs from "@mui/material/Tabs";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import TopicContent from "./TopicContent";
import Tab from "@mui/material/Tab";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import TopicVideos from "./TopicVideos";
import TopicProblems from "./TopicProblems";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";


const TopicTab = () => {
    const [value, setValue] = useState('content');
    const [topics, setTopics] = useState([]);
    const [topicContent, setTopicContent] = useState({
        _id: "",
        languageId: "",
        title: "",
        content: "",
        video: "",
        problems: []
    });
    const {id} = useParams();
    let navigate = useNavigate()
    let {pathname} = useLocation();

    //Fetching single topic
    useEffect(() => {
        const fetchTopic = async () => {
            const {data} = await axios.get(`/api/topic/${id}`);
            setTopicContent(data);
            const {languageId} = data;
            const res = await axios.get(`/api/topic/all/${languageId}`);
            setTopics(res.data);
        }
        fetchTopic();
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='content-margin'>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Box sx={{backgroundColor: 'white'}}>
                        <Typography align='center' mt={2}>All Topic</Typography>
                        {topics.map((item) => (
                            <Typography
                                key={item._id}
                                mt={2}
                                align='justify'

                            >
                                <Button
                                    sx={{
                                        color: 'success.dark',
                                    }}
                                    to={`/topic/${item._id}`}
                                    component={Link}
                                >
                                    {item.title}
                                </Button>
                            </Typography>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box sx={{backgroundColor: 'white'}}>

                        <Tabs
                            sx={{mx: 40}}
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                            variant="fullWidth"
                            textColor="inherit"
                        >
                            <Tab
                                value="content"
                                label="Details"
                            />
                            <Tab value="video" label="Video"/>
                            <Tab value="problem" label="Problem List"/>
                        </Tabs>
                        {value === 'content' &&
                        <TopicContent id={id} content={topicContent.content} title={topicContent.title}
                                      video={topicContent.video}/>}
                        {value === 'video' && <TopicVideos videos={topicContent.video}/>}
                        {value === 'problem' && <TopicProblems/>}

                    </Box>
                </Grid>

            </Grid>


        </div>
    )
}

export default TopicTab;