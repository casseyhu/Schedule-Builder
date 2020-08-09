import React from 'react'
import { connect } from 'react-redux'
import testJson from './TestCourses.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {
    
    handleClear = () => {
        const fireStore = getFirestore();
        console.log(this.props.auth);
        fireStore.collection('users').doc(this.props.auth.uid).update({
            userCourses: []
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            userCourses: testJson.courses
        }).then(() => {
            console.log("DATABASE RESET");
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);