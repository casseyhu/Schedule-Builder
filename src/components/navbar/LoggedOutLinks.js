import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedOutLinks extends React.Component {
  render() {
    return (
      <ul className = "right">
        <li><NavLink to="/register">Register</NavLink></li>
      </ul>
    );
  }
}

export default LoggedOutLinks;