import Tabs from "@mui/material/Tabs";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import TopicContent from "./TopicContent";
import Tab from "@mui/material/Tab";
import {useParams} from "react-router-dom";
import axios from "axios";
import TopicVideos from "./TopicVideos";
import TopicProblems from "./TopicProblems";


const TopicTab = () => {
    const [value, setValue] = useState('content');
    const [topicContent, setTopicContent] = useState({
        _id: "",
        languageId: "",
        title: "",
        content: "",
        video: "",
        problems: []
    });
    const {id} = useParams();

    //Fetching single topic
    useEffect(() => {
        const fetchTopic = async () => {
            const {data} = await axios.get(`/api/topic/${id}`);
            setTopicContent(data);
        }
        fetchTopic();
    }, [])


    const handleChange = (event, newValue) => {

        setValue(newValue);
    };

    return (
        <div className='content-margin'>
            <Box sx={{backgroundColor:'white'}}>
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
                    <Tab value="problem" label="Problems"/>
                </Tabs>

                {value === 'content' && <TopicContent id = {id} content={topicContent.content} title={topicContent.title} video={topicContent.video}/>}
                {value === 'video' && <TopicVideos videos={topicContent.video}/>}
                {value === 'problem' && <TopicProblems/>}
            </Box>
        </div>
    )
}

export default TopicTab;