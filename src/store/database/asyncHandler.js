import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = (credentials, firebase) => (dispatch, getState) => {
    console.log('handler ' + credentials.email);
    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
    ).then(() => {
        console.log("LOGIN_SUCCESS");
        dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (newUser.email == '' || newUser.password == '')
        alert("Submit failed. Enter something");
    else {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
            owner: newUser.email,
            userCourses: newUser.userCourses
        })).then(() => {
            dispatch(actionCreators.registerSuccess);
        }).catch((err) => {
            dispatch(actionCreators.registerError);
            console.log(err);
            alert(err.message);
        });
    }
};


export const updateUsersHandler = (users) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('users').get().then(function (list) {
        list.forEach(function () {
            firestore.collection('users').doc(users.id).set({
                userCourses: "hello"
            });
        });
    }).then(() => {
        dispatch({ type: 'UPDATE_SUCCESS' });
    }).catch((err) => {
        dispatch({ type: 'UPDATE_ERROR' });
        console.log(err);
    });
};