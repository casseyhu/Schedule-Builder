import authReducer from './authReducer'
import courseReducer from './courseReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer