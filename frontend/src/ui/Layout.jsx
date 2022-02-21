import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "./Layout.scss";
import React from "react";
import ContactUs from "../components/ContactUs";
import Feature from "../components/Feature";
import {Home} from "../pages/Home";
import Navbar from "../components/Navbar";

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="component-content">{children}</div>
            <Footer />
        </>
    );
};