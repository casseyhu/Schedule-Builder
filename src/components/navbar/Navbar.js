import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { firestoreConnect } from 'react-redux-firebase';

class Navbar extends React.Component {

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper" style={{backgroundColor:"#6A7687", width: '100%'}}>
        <div className="container1">
          {/*<Link to="/" className="brand-logo" style={{fontSize: '20pt', left: '1%'}} >Wireframer!</Link>*/}
          {links}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);