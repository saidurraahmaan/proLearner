import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {AppBar} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Pie} from "react-chartjs-2";
import axios from "axios";
import {getUser} from "../helpers";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);




const Statistics = ()=>{
    const [AC,setAC] = useState(0);
    const [WA,setWA] = useState(0);
    const [CE,setCE] = useState(0);
    const [RE,setRE] = useState(0);
    useEffect(()=>{
        const getAC = ()=>{
            axios
                .get('/api/submission',{headers: {"Authorization": `Bearer ${getUser().data.token}`}})
                .then(res=>{
                    setAC(res.data.AC);
                    setWA(res.data.WA);
                    setCE(res.data.CE);
                    setRE(res.data.RE);
                })
        }
        getAC();
    },[])
    const navigate = useNavigate();
    const Chart = {

        labels: ['WA', 'CE', 'RE', 'AC'],
        datasets: [
            {
                label: '# of Votes',
                data: [WA,CE,RE,AC],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(54, 0, 0, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            <Grid item xs={6} >
                <AppBar position="static" color="inherit">
                    <Typography m={3} variant="inherit" alignItems='center' style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <LeaderboardIcon color='secondary' sx={{mr: 2}}/>
                        Statistics
                    </Typography>
                </AppBar>
                <Card variant="outlined" >
                    <Typography my={3}>
                        <Pie data={Chart} />
                    </Typography>
                </Card>
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
            </Grid>
        </>
    )
}
export default Statistics;