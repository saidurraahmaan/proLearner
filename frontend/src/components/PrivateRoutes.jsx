import {getUser} from "../pages/helpers";
import React from "react";
import {Outlet,Navigate} from 'react-router-dom'

const PrivateRoutes = ()=>{
    const isLoggedIn  = getUser();

    return isLoggedIn ? <Outlet/> : <Navigate to='/signIn' />
}
export default PrivateRoutes;