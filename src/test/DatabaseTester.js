import React from 'react'
import { connect } from 'react-redux'
import testJson from './TestCourses.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {
    //clears admin(jV0SrVv0bcSsNzU9i5KcWJ1Xnpt2)'s courses
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc('jV0SrVv0bcSsNzU9i5KcWJ1Xnpt2').set({
            firstName: 'test',
            lastName: 'admin',
            initials: 'TA',
            owner: 'admin@admin.com',
            userCourses: []
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc('jV0SrVv0bcSsNzU9i5KcWJ1Xnpt2').update({
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