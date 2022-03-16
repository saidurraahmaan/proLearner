import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import ProblemTab from "./ProblemTab";
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import Container from "@mui/material/Container";


const TopicProblems = () => {
    const [problems, setProblems] = useState([]);
    const {id} = useParams();

    //api/ problem/all/:id
    //Fetching all problems
    useEffect(() => {
        let mount = true;
        const fetchProblems = async () => {
            const {data} = await axios.get(`/api/problem/all/${id}`);
            if(mount){
                setProblems(data);

            }
        }
        fetchProblems();
        return ()=>{
            mount = false;
        }
    }, [problems])
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 5}}>
                <Container maxWidth="sm">
                    <CardContent>
                        <Typography sx={{fontSize: 28, fontWeight: "bold", mb: 2}} color="text.primary" >
                            Problem list
                        </Typography>
                        <List sx={{width: '100%', backgroundColor: 'background.paper'}}>
                            {problems.length && problems.map((p) => (
                                <ListItemButton key={p._id} to={`/problem/${p._id}`} component={Link}>
                                    <ListItemText primary={p.title}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button to={`/add/problem/${id}`}
                                component={Link}
                                variant="contained"
                                color="secondary"
                                sx={{m: 1,mx:20}}>
                            <AddCircleOutlineSharpIcon/>
                        </Button>
                    </CardActions>
                </Container>
            </Card>
        </>
    )
}

export default TopicProblems;
