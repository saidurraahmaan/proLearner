import { Footer } from "../components/Footer";

import "./Layout.scss";
import React from "react";

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