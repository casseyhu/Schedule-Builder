import * as actionCreators from '../actions/actionCreators.js'

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
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        owner: newUser.email,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`, 
        admin: false,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const updateRegister = (wireframe, owner1) => (dispatch, getState, { getFirestore }) => {
  console.log(wireframe)
  var firestore = getFirestore();
  firestore.collection("wireframes").doc(wireframe.id).update({name : wireframe.name, owner: owner1})
};

export const submitRegister = (wireframe, t, a, d, c, history) => (dispatch, getState, { getFirestore }) => {
  var firestore = getFirestore();
  wireframe.items[wireframe.key] = ({ 'assigned_to': a, 'completed': c,'description': t,'due_date': d, 'key': wireframe.key});
  firestore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
  history.push('/wireframes/' + wireframe.id);
};

export const createRegister = (props) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  fireStore.collection('wireframes').add({
    name: "Unknown",
    owner: getState().firebase.auth.email,
    width: 4800,
    height: 4800,
    items: [],
    time: new Date()}).then(
        function(docRef){
            props.push("/wireframe/"+ docRef.id);
    });
};
