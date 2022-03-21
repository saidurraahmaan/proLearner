import React from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import HTMLReactParser from "html-react-parser";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getUser} from "../helpers";
import {Container} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Problem = ({
                     title,
                     topicId,
                     problemStatement,
                     problemSampleInput,
                     problemSampleOutput,
                     constraints,
                 }) => {

    const {id} = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 15}}
            >
                <CardContent sx={{p:6}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{fontSize: 28, fontWeight: "bold", mb: 2, textAlign: "center"}}
                                color="primary"
                                gutterBottom
                            >
                                {title}
                            </Typography>
                            <Typography component={'span'} sx={{fontSize: 14, mb: 2}} color="text.primary" gutterBottom>
                                {HTMLReactParser(problemStatement)}
                            </Typography>
                            <Typography component={'span'} sx={{fontSize: 14, m: 2}} color="text.primary" gutterBottom>
                                <h3>Constraints: </h3>
                                {HTMLReactParser(constraints)}
                            </Typography>
                            <Table sx={{border: 1}} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 1}}}>
                                        <TableCell>Input</TableCell>
                                        <TableCell>Output</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{'&:last-child td, &:last-child th': {border: 1}}}
                                    >
                                        <TableCell>{HTMLReactParser(problemSampleInput)}</TableCell>
                                        <TableCell>{HTMLReactParser(problemSampleOutput)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>

                    </Grid>
                </CardContent>
                {/*{getUser() ? getUser().data.isAdmin && (*/}
                {/*    <CardActions>*/}
                {/*        <Button to={`/update/problem/${id}`} component={Link} size="small"*/}
                {/*                variant='outlined' color='error'>Update Problem</Button>*/}
                {/*    </CardActions>) : <></>*/}
                {/*}*/}

                <Card>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="contained"
                        color="warning"
                        sx={{mx: 5, my: 1}}
                    >
                        < ArrowBackIcon/>
                    </Button>
                </Card>
            </Card>
        </>
    );
}
export default Problem;