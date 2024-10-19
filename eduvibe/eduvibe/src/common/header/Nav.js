import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <ul className="mainmenu">
            <li >
                <Link to="/">Home</Link>
            </li>

            <li >
                <Link to="/about-us">About Us</Link>
            </li>
            
            <li className="">
                <Link to="/trip-plans">Trip Plans</Link>
            </li>
            <li className="">
                <Link to="/contact-us">Contact Us</Link>
            </li>
        </ul>
    )
}
export default Nav;
