import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {getUser} from "../helpers";
import Button from "@mui/material/Button";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

const ProblemList = () => {
    const [problemList, setProblemList] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        let mount = true;
        const fetchProblems = async () => {
            const {data} = await axios.get(`/api/problem/all/${id}`);
            if (mount) {
                setProblemList(data);
            }
        }
        fetchProblems();
        return () => {
            mount = false;
        }
    },[id])

    return (
        <div className='content-margin'>
            <Card sx={{minWidth: 275, my: 0, mx: 5}} className='content-margin'>
                <Container maxWidth="sm">
                    <CardContent>
                        <Typography sx={{fontSize: 28, fontWeight: "bold", mb: 2}} color="text.primary">
                            Problem list
                        </Typography>
                        <List sx={{width: '100%', backgroundColor: 'background.paper'}}>
                            {problemList.length && problemList.map((p) => (
                                <Typography key={p._id}>
                                    <Button to={`/problem/${p._id}`} component={Link}>{p.title}</Button>
                                </Typography>
                            ))}
                        </List>
                    </CardContent>
                    {getUser() &&
                    <CardActions>
                        <Button to={`/add/problem/${id}`}
                                component={Link}
                                variant="contained"
                                color="secondary"
                                sx={{m: 1, mx: 20}}>
                            <AddCircleOutlineSharpIcon/>
                        </Button>
                    </CardActions>
                    }
                </Container>
            </Card>
        </div>
    );
}
export default ProblemList;