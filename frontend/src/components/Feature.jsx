import React from "react";
import FeatureBox from "./FeatureBox";
import featureImage1 from '../assets/images/feature_1.png'
import featureImage2 from '../assets/images/feature_2.png'
import featureImage3 from '../assets/images/feature_3.png'

const Feature = ()=>{


    return(
        <div id='feature'>
            <div className='a-container'>
                <FeatureBox image={featureImage2} title='Programming Language' />
                <FeatureBox image={featureImage1} title='Problem Solving' />
                <FeatureBox image={featureImage3} title='Community' />
            </div>
        </div>
    );
}
export default Feature;