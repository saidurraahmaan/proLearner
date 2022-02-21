import React, {useContext} from "react";
import ProLearnerContext from "../../context/ProLearnerContext";
import Language from "./Language";
import '../../Card.scss'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";


const LanguageList = () => {
    const {languages} = useContext(ProLearnerContext);
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
