import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

class Navbar extends React.Component {
    render() {
        const { auth, profile } = this.props;
        //if logged in then log out displayed, if logged out then log in and register displayed
        const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
        return (
            <nav className="nav-wrapper red darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo"> Schedule Builder </Link>
                    {links}
                </div>
            </nav>
        );
    }
    
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
});
  
export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)(Navbar);