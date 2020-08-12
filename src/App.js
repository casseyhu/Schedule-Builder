import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/nav_bar/Navbar';
import HomeSchedule from './components/home_screen/HomeSchedule';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Search from './components/search/Search'
import DatabaseTester from './test/DatabaseTester'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class App extends Component {
    render() {
        const { auth } = this.props;
        if (auth.isLoaded) {
            return (
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            <Route exact path='/' component={HomeSchedule} />
                            <Route path="/tester" component={DatabaseTester} />
                            <Route path='/login' component={LogIn} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/search' component={Search} />
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);
