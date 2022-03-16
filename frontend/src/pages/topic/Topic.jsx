import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";


const Topic = ({topic, index}) => {
    const {_id, title} = topic;
    const colors = ["#4cad63","#c98fc8","#e3c310","#00edae","#c2256e","#0f0f0f","#7538c9","#991d6e","#803b9c","#0d0901","#e0ba80","#cca543","#40cf93","#8540cf","#c495e6", "#50C7C7", "#72dba8", "#CF974E", "lemonchiffon"];

    return (
        <>
            <div className="card card-1" style={{backgroundColor:colors[index%colors.length]}}>
                <div className="top">
                    <img
                        src="https://i.pinimg.com/originals/67/0b/bc/670bbc8b2507d5f2f0b32f73224e972a.gif"
                        alt="material ui"/>
                </div>
                <div className="bottom">
                    <Button to={`/topic/${_id}`} component={Link}  color='inherit'
                            variant='contained'>{title}</Button>
                </div>
            </div>

        </>
    )
}
export default Topic;