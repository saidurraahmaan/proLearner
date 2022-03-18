import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Editor from "@monaco-editor/react";
import Button from "@mui/material/Button"
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {Audio, Plane, Watch} from 'react-loader-spinner'
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {getUser} from "../helpers";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));
const languages = ["C", "C++", "Python 3", "C#", "Java"]

const getLanguageId = (language) => {
    switch (language) {
        case "C":
            return 50;
        case "C++":
            return 54;
        case "Python 3":
            return 71;
        case "C#":
            return 51;
        case "Java":
            return 62;
        default:
            return 54;
    }
}


const Submission = ({input, output, extraInput, extraOutput,problemId}) => {
    const [sourceCode, setSourceCode] = useState("");
    const [language, setLanguage] = useState("C");
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const navigate = useNavigate();
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setLanguage(event.target.value);
    };

    const handleEditorChange = (value, event) => {
        setSourceCode(value);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        let stdin = input.replace(/<[^>]+>/g, '');
        let expected_output = output.replace(/<[^>]+>/g, '');
        extraInput = extraInput.replace(/<[^>]+>/g, '');
        extraOutput = extraOutput.replace(/<[^>]+>/g, '');


        stdin = base64_encode(stdin);
        expected_output = base64_encode(expected_output);
        extraInput = base64_encode(extraInput)
        extraOutput = base64_encode(extraOutput);

        const source_code = base64_encode(sourceCode);
        const language_id = getLanguageId(language);

        var options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': '16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a'
            },
            data: {
                language_id,
                source_code,
                stdin: stdin ? stdin : {},
                expected_output: expected_output ? expected_output : {}
            }
        };

        axios.request(options).then(function (response) {

            var options = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
                params: {base64_encoded: 'true', fields: '*'},
                headers: {
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': '16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a'
                }
            };

            axios.request(options).then(function (response) {

                if (response.data.status.description === "Accepted") {
                    var options = {
                        method: 'POST',
                        url: 'https://judge0-ce.p.rapidapi.com/submissions',
                        params: {base64_encoded: 'true', fields: '*'},
                        headers: {
                            'content-type': 'application/json',
                            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                            'x-rapidapi-key': '16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a'
                        },
                        data: {
                            language_id,
                            source_code,
                            stdin: extraInput ? extraInput : {},
                            expected_output: extraOutput ? extraOutput : {}
                        }
                    };

                    axios.request(options).then(function (response) {

                        var options = {
                            method: 'GET',
                            url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
                            params: {base64_encoded: 'true', fields: '*'},
                            headers: {
                                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                                'x-rapidapi-key': '16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a'
                            }
                        };

                        axios.request(options).then(function (response) {

                            setIsLoading(false)
                            setAlertContent(response.data.status.description);
                            setAlert(true);
                            axios
                                .post("/api/submission",{
                                    problemId,
                                    userId:getUser().data._id,
                                    language,
                                    verdict:response.data.status.description,
                                }).then(()=>{

                            }).catch(e=>console.log(e));
                        }).catch(function (error) {
                            console.error(error);
                        });
                    }).catch(function (error) {
                        console.error(error);
                    });
                } else {
                    setIsLoading(false)
                    setAlertContent(response.data.status.description);
                    setAlert(true);
                    axios
                        .post("/api/submission",{
                            problemId,
                            userId:getUser().data._id,
                            language,
                            verdict:response.data.status.description,
                        }).then(()=>{

                    })
                        .catch(e=>console.log(e))
                }

            }).catch(function (error) {
                console.error(error);
            });
        }).catch(function (error) {
            console.error(error);
        });

        // axios
        //     .post("/api/submission/2",
        //         {
        //             source_code,
        //             language,
        //             input,
        //             expected_output
        //         })
        //     .then(res=>{
        //         console.log(res);
        //     })

    }
    return (

        <>
            {isLoading ?
                <Container maxWidth='sm'>
                    <Plane ariaLabel="loading-indicator"/>
                </Container>
                : (
                    <>
                        {alert ? (<>{alertContent === 'Accepted' ?
                            (
                                <>
                                    <Alert severity='success'> {alertContent} </Alert>
                                </>
                            )
                            : (<>
                                <Alert severity='error'>{alertContent}</Alert>
                            </>)}
                            </>)
                            : (
                                <Card
                                    sx={{minWidth: 275, my: 0, mx: 2}}
                                >
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <Editor
                                                    height="80vh"
                                                    defaultLanguage="cpp"
                                                    defaultValue={`\n#include<stdio.h>\n\n\nint main(){\n\t//Write your code\n\n\n}`}
                                                    onChange={handleEditorChange}
                                                    options={{

                                                        minimap: {
                                                            enabled: false,
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid
                                                item xs={2}
                                            >
                                                <div>
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <InputLabel ref={inputLabel}>
                                                            Language
                                                        </InputLabel>
                                                        <Select
                                                            value={language}
                                                            onChange={handleChange}
                                                            labelWidth={labelWidth}
                                                        >
                                                            {languages.map((item, index) => (
                                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div style={{position: 'absolute', bottom: 0, margin: "20px"}}>
                                                    <Button variant='outlined' onClick={handleSubmit}> Submit </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>)}
                    </>
                )}
        </>
    )
}
export default Submission;