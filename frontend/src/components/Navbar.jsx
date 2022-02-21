import React, {useState} from "react";
import logo from '../assets/images/logo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [nav, setNav] = useState(false);

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
                    <li><Link to='/'>Community</Link></li>
                    <li><Link to='/languages'>Languages</Link></li>
                    <li><Link to='/signUp'>SignUp</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;