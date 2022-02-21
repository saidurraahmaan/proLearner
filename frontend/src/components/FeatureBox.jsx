import React from "react";

const FeatureBox = ({title,image}) => {
    return (
        <div className='a-box'>
            <div className='a-b-img'>
                <img  src={image}   alt='image'/>
            </div>
            <div className='s-b-text'>

                <h2>{title}</h2>

            </div>
        </div>
    );
}
export default FeatureBox;