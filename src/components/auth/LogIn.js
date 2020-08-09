import React, {Component} from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { loginHandler } from '../../store/database/asyncHandler'

class LogIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const { firebase } = props; 
        const credentials = { ...state };
        props.login(credentials, firebase);
    }

    render() {
        // Redirect to home page if successful login
        const { auth, authError } = this.props;
        if (auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container"> 
                <form className="white">
                    <h5 className="grey-text text-darken-3" style={{textAlign: 'center'}}> Login </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field" style={{textAlign: 'center'}}>
                        <button onClick={this.handleSubmit} className="btn red waves-effect lighten-1 z-depth-0">Login</button>
                        {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
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
    login: (credentials, firebase) => dispatch(loginHandler(credentials, firebase)),
  });
  
  export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
  )(LogIn);