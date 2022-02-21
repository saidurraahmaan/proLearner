import React, {Component} from "react";
import "./Compiler.css";

import Grid from "@mui/material/Grid";


export default class Compiler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: localStorage.getItem('input')||``,
            output: ``,
            language_id:localStorage.getItem('language_Id')|| 2,
            user_input: ``,
        };
    }
    input = (event) => {

        event.preventDefault();

        this.setState({ input: event.target.value });
        localStorage.setItem('input', event.target.value)

    };
    userInput = (event) => {
        event.preventDefault();
        this.setState({ user_input: event.target.value });
    };
    language = (event) => {

        event.preventDefault();

        this.setState({ language_id: event.target.value });
        localStorage.setItem('language_Id',event.target.value)

    };

    submit = async (e) => {
        e.preventDefault();

        let outputText = document.getElementById("output");
        outputText.innerHTML = "";
        outputText.innerHTML += "Creating Submission ...\n";
        const response = await fetch(
            "https://judge0-ce.p.rapidapi.com/submissions",
            {
                method: "POST",
                headers: {
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                    "x-rapidapi-key": "16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    source_code: this.state.input,
                    stdin: this.state.user_input,
                    language_id: this.state.language_id,
                }),
            }
        );
        outputText.innerHTML += "Submission Created ...\n";
        const jsonResponse = await response.json();

        let jsonGetSolution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
        };

        while (
            jsonGetSolution.status.description !== "Accepted" &&
            jsonGetSolution.stderr == null &&
            jsonGetSolution.compile_output == null
            ) {
            outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
            if (jsonResponse.token) {
                let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

                const getSolution = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": "16a1000631mshc31899b6d78155bp19c67ejsnd9e9e43b867a", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
                        "content-type": "application/json",
                    },
                });

                jsonGetSolution = await getSolution.json();
            }
        }
        if (jsonGetSolution.stdout) {
            const output = atob(jsonGetSolution.stdout);

            outputText.innerHTML = "";

            outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
        } else if (jsonGetSolution.stderr) {
            const error = atob(jsonGetSolution.stderr);

            outputText.innerHTML = "";

            outputText.innerHTML += `\n Error :${error}`;
        } else {
            const compilation_error = atob(jsonGetSolution.compile_output);

            outputText.innerHTML = "";

            outputText.innerHTML += `\n Error :${compilation_error}`;
        }
    };

    render() {
        return (
            <>
                <Grid
                    container spacing={2}
                    sx={{mt: 12}}
                >
                    <Grid
                        item xs={6}
                        sx={{ml: 4, mb: 2}}
                    >
                        <div>
                            <label htmlFor="solution">
                                Code Here
                            </label>
                            <textarea
                                required
                                name="solution"
                                id="source"
                                onChange={this.input}
                                className=" source"
                                value={this.state.input}>
                            </textarea>
                            <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={this.submit}> Run
                            </button>

                            <label htmlFor="tags" className="mr-2">
                                <b className="heading">Language:</b>
                            </label>

                            <select
                                value={this.state.language_id}
                                onChange={this.language}
                                id="tags"
                                className="form-control language"
                            >
                                <option value="54">C++</option>
                                <option value="50">C</option>
                                <option value="62">Java</option>
                                <option value="71">Python</option>
                            </select>
                        </div>
                    </Grid>

                    <Grid
                        item xs={4}
                        sx={{ml: 4, mb: 2}}
                    >
                        <div>
                            <label htmlFor="solution">
                                Output
                            </label>
                            <textarea id='output' > </textarea>
                        </div>
                        <label htmlFor="tags" className="mr-2">
                            <b className="heading">User Input:</b>
                        </label>

                        <div>

                            <textarea id="input" onChange={this.userInput}> </textarea>
                        </div>
                    </Grid>

                </Grid>

            </>
        );
    }
}