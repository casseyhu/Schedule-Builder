import React, {Component} from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
        console.log(this.state);
        const { props, state } = this;
        const { firebase } = props;
        const credentials = { ...state };
        props.login(credentials, firebase);
        // Redirect to home page if successful. add error check
        // window.location.href = "/";
    }

    render() {
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
                        <button onClick={this.handleSubmit} className="btn pink lighten-1 z-depth-0">Login</button>
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