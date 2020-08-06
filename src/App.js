import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/nav_bar/Navbar'
import HomeSchedule from './components/home_screen/HomeSchedule'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomeSchedule} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </Switch>

          {/* <p id="loginTitle"> Sign Up / Login </p>
          <div class="form-container">
              <input type="email" placeholder="Email" id="email"/>
              <input type="password" placeholder="Password" id="password"/>
              <button onclick="signup()" id="signup"> Sign Up </button>
              <button onclick="login()" id="login"> Login </button>
              <button onclick="logout()" id="logout"> Log Out </button>
          </div> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
