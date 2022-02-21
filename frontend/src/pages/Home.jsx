import './language/Language.scss'
import React from "react";
import landingPage from '../assets/images/landingPage.png'
import landingPage2 from '../assets/images/langingPage2.png'
import LanguageList from "./language/LanguageList";
import Grid from "@mui/material/Grid";
import Feature from "../components/Feature";
import ContactUs from "../components/ContactUs";
import {Header} from "../components/Header";


export const Home = () => {

    return (
        <div>
            <Header/>
            <Feature/>
            <LanguageList/>
            <ContactUs/>
        </div>
    );
};
