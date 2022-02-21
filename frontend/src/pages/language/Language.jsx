import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";
import "./Language.scss";
import '../../Card.scss'

const Language = ({index, language}) => {
    const {_id, title, description} = language;
    const colors = ["#c495e6", "#50C7C7","#72dba8", "#CF974E",  "lemonchiffon"];

    return (
        <>
            <div className="card card-1" style={{backgroundColor: colors[index]}}>
                <div className="top">
                    <img
                        src="https://rb.gy/k2xczz"
                        alt="material ui"/>
                </div>
                <div className="bottom">
                    <Button to={`/topic/all/${_id}`} component={Link} color='secondary'
                            variant='outlined'>Learn {title}</Button>
                </div>
            </div>


        </>
    );
}
export default Language;
