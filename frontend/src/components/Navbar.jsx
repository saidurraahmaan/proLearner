import React, {useEffect, useState} from "react";
import logo from '../assets/images/logo.png'
import {Link, useNavigate} from 'react-router-dom'
import {getUser, logout} from "../pages/helpers";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [name, setName] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (getUser()) {
            setIsUser(true);
            setName(getUser().data.name);
        } else {
            setIsUser(false);
            setName(null);
        }
    }, [])


    const handleLogout=()=>{
        logout();
        setIsUser(false);
        setName(null);
        window.location="/";
    }

    const changeBackground = () => {
        window.scrollY >= 50 ? setNav(true) : setNav(false);
    }
    window.addEventListener('scroll', changeBackground);

    return (
        <div>
            <nav className={nav ? 'nav active' : 'nav'}>
                <Link to='/' className='logo'>
                    <img src={logo} alt='logo'/>
                </Link>
                <input type='checkbox' className='menu-btn' id='menu-btn'/>
                <label htmlFor="menu-btn" className='menu-icon'>
                    <span className='nav-icon'> </span>
                </label>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/community/post'>Community</Link></li>
                    <li><Link to='/languages'>Languages</Link></li>
                    {isUser ? (
                        <>
                            <li><Link to={`/profile/statistics`}>Hello {name.split(" ")[0]}</Link></li>
                            <li>
                                <button onClick={handleLogout}>LogOut</button>
                            </li>
                        </>
                    ) : (
                        <li><Link to='/signIn'>Login</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;