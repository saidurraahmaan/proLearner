import React, {useContext} from "react";
import ProLearnerContext from "../../context/ProLearnerContext";
import Language from "./Language";
import '../../Card.scss'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";


const LanguageList = () => {
    const {languages} = useContext(ProLearnerContext);
    const navigate = useNavigate();
    return (
        <div className='body first-margin-language'>
            <Grid container
                  spacing={12}
                  alignItems="center"
                  justifyContent="center"
                  justify="space-around"
                  style={{minHeight: '100vh',backgroundColor:"white"}}

            >

                <Grid item xs={6} sm={9}>

                    {languages.map((item, i) => (
                        <Language
                            key={item._id}
                            index={i}
                            language={item}
                        />
                    ))}

                </Grid>
            </Grid>

        </div>

    )
};
export default LanguageList;
