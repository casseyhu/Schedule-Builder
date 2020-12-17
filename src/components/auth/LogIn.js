import React, {Component} from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { loginHandler } from '../../store/database/asyncHandler';
import * as Constants from '../../constants';

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
                <form style={{borderTop:Constants.BORDER_RED_COLOR, borderBottom:Constants.BORDER_RED_COLOR}}>
                    <h4 className="grey-text text-darken-3" style={{textAlign: 'center'}}> Login </h4>
                    <div className="input-field">
                        <i class="material-icons prefix">person</i>
                        <input id="icon_prefix" type="email" id="email" class="validate" onChange={this.handleChange}/>
                        <label for="icon_prefix">Email</label>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">lock_outline</i>
                        <input id="icon_prefix" type="password" id="password" class="validate" onChange={this.handleChange}/>
                        <label for="icon_prefix">Password</label>
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