import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import React from "react";
import HTMLReactParser from "html-react-parser";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const Solution = ({solutions}) => {
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 15}}>
                <CardContent sx={{p:6}}>
                    <Typography sx={{ mb: 2}} component={'span'} color="text.primary" gutterBottom>
                        {HTMLReactParser(solutions)}
                    </Typography>
                </CardContent>
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
export default Solution;