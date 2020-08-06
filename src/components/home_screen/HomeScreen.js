import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { createRegister } from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    handleNewList = () =>{
        this.props.create(this.props.history);
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container1">
                <div className="row">
                    <div className="col s15 m5">
                        <div className = "recentWorks">
                        </div>
                    </div>

                    <div className="col s6">     
                        <div className="home_new_list_container">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        wireframes: state.firestore.data,
    };
};

const mapDispatchToProps = dispatch => ({
    create: (props) => dispatch(createRegister(props))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ['time', 'desc'] },
    ]),
)(HomeScreen);
