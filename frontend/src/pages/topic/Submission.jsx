import Grid from "@mui/material/Grid";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Editor from "@monaco-editor/react";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";


const Submission = () => {

    const handleEditorChange = (value, event) => {
        console.log("here is the current model value:", value);
    }
    return (
        <>
            <Card
                sx={{minWidth: 275, my: 0, mx: 2}}
            >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Editor
                                height="80vh"
                                defaultLanguage="c"
                                defaultValue={`\n#include<stdio.h>\n\n\nint main(){\n\t//Write your code\n\n\n}`}
                                onChange={handleEditorChange}
                                options={{
                                    theme: "vs-dark",
                                    minimap: {
                                        enabled: false,
                                    },
                                }}
                            />
                        </Grid>

                            <Grid
                                item xs={2}
                            >
                                <Button variant='outlined'> Submit </Button>
                            </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
export default Submission;