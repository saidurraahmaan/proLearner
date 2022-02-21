import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'


const ProLearnerContext = createContext();
export const ProLearnerProvider = ({children})=>{

    const [languages,setLanguages] = useState([]);


    //Fetching all languages
    useEffect(()=>{
        const fetchLanguages =async ()=>{
            const {data} =await axios.get('/api/languages');
            setLanguages(data);
        }
         fetchLanguages();
    },[])


















    return(
        <ProLearnerContext.Provider value={{
            languages,
        }}>
            {children}
        </ProLearnerContext.Provider>
    );
}

export default ProLearnerContext;