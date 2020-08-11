import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logoutHandler } from '../../store/database/asyncHandler'

class SignedInLinks extends React.Component {
    handleLogout = () => {
        const { firebase } = this.props;
        this.props.signOut(firebase);
        window.location = '/login';
    }

    render() {
        const { profile } = this.props;
        return (
            <ul className="right">
                <li><NavLink to="/"> My Schedule </NavLink></li>
                <li><NavLink to="/"> Search </NavLink></li>
                <li><NavLink to="/" className="btn btn-floating blue-grey lighten-2">{profile.initials}</NavLink></li>
                <li><NavLink to="/login" onClick={this.handleLogout}> Log Out </NavLink></li>
            </ul>
        );
    }
    
}

const mapDispatchToProps = dispatch => ({
    signOut: firebase => dispatch(logoutHandler(firebase)),
});
  
export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps),
)(SignedInLinks);