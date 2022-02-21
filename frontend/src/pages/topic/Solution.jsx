import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import React from "react";
import HTMLReactParser from "html-react-parser";

const Solution = ({solutions}) => {
    return (
        <>
            <Card sx={{minWidth: 275, my: 0, mx: 20}}>
                <CardContent>
                    <Typography sx={{fontSize: 28, mb: 2}} component={'span'} color="text.primary" gutterBottom>
                        {HTMLReactParser(solutions)}
                    </Typography>

                </CardContent>
                <CardActions>
                    {/*<Button size="small">Learn More</Button>*/}
                </CardActions>
            </Card>
        </>
    );
}
export default Solution;