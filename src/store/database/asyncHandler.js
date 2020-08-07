export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
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
        dispatch({ type: 'LOGOUT_SUCCESS' });
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(newUser.firstName);
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        owner: newUser.email,
        userCourses: newUser.userCourses
    })).then(() => {
        dispatch({ type: 'REGISTER_SUCCESS' });
        console.log("wokrs");
    }).catch((err) => {
        dispatch({ type: 'REGISTER_SUCCESS' });
        console.log(err);
    });
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