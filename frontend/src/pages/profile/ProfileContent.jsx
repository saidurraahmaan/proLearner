import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Button, Container,AppBar} from "@mui/material";
import Statistics from "./Statistics";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import TopicIcon from '@mui/icons-material/Topic';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import Box from "@mui/material/Box";
import {Link, useLocation, useParams} from "react-router-dom";
import MyProblemList from "./MyProblemList";
import MyTopicList from "./MyTopicList";

const ProfileContent = () => {
    const param = useLocation()
    const {pathname}= useLocation();
    return (
        <div className='content-margin'>
            <Box sx={{flexGrow: 1}}>

                <Container maxWidth='md'>
                    <Grid container spacing={2} columnSpacing={{xs: 4, sm: 2, md: 3}}>
                        <Grid item xs={4}>
                            <AppBar position="static" color="inherit">
                                <Typography m={3} variant="inherit" alignItems='center' style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <PersonIcon color='secondary' sx={{mr: 2}}/>
                                    Profile
                                </Typography>
                            </AppBar>
                            <Card variant="outlined">
                                <Typography my={3}>

                                    <Button color='secondary'
                                            sx={{ml: 3}}
                                            startIcon={<LeaderboardIcon/>}
                                            to='/profile/statistics'
                                            component={Link}
                                    >
                                        Statistics </Button>
                                </Typography>
                                <Typography my={3}>
                                    <Button
                                        color='secondary'
                                        sx={{ml: 3}}
                                        startIcon={<TopicIcon/>}
                                        to='/profile/myTopic'
                                        component={Link}
                                    >
                                        My Topic </Button>
                                </Typography>
                                <Typography my={3}>

                                    <Button
                                        color='secondary'
                                        sx={{ml: 3}}
                                        startIcon={<BugReportIcon/>}
                                        to='/profile/myProblem'
                                        component={Link}
                                    > My
                                        Problem </Button>
                                </Typography>
                            </Card>
                        </Grid>
                        {
                            pathname==='/profile/statistics' ? <Statistics/> :<></>
                        }
                        {
                            pathname==='/profile/myProblem' ? <MyProblemList/> :<></>
                        }
                        {
                            pathname==='/profile/myTopic' ? <MyTopicList/> :<></>
                        }
                    </Grid>
                </Container>

            </Box>
        </div>
    );
}

export default ProfileContent;