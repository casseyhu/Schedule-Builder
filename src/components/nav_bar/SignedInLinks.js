import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/"> My Schedule </NavLink></li>
            <li><NavLink to="/"> Search </NavLink></li>
            <li><NavLink to="/" className="btn btn-floating blue-grey lighten-2"> PF </NavLink></li>
            <li><NavLink to="/"> Log Out </NavLink></li>
        </ul>
    )
}

export default SignedInLinks