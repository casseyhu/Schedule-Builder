import React, {Component} from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asyncHandler'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userCourses: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const { props, state } = this;
        const { firebase } = props;
        const newUser = { ...state };
        props.register(newUser, firebase);
    }

    render() {
        return (
            <div className="container"> 
                <form onSubmit={this.handleSubmit} className="white">
                    <h4 className="grey-text text-darken-3" style={{textAlign: 'center'}}> Sign Up </h4>
                    <div className="input-field">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field" style={{textAlign: 'center'}}>
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError,
  });
  
  const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });
  
  export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
  )(SignUp);