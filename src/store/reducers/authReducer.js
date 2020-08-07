import * as actionCreators from '../actions/actionCreators'

const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionCreators.LOGIN_ERROR:
            return {
                ...state,
                authError: 'Login fail',
            };
        case actionCreators.LOGIN_SUCCESS:
            return {
                ...state,
                authError: null,
            };
        case actionCreators.LOGOUT_SUCCESS:
            return state;
        case actionCreators.REGISTER_SUCCESS:
            return {
                ...state,
                authError: null,
            };
        case actionCreators.REGISTER_ERROR:
            return {
                ...state,
                authError: action.err.message,
            };
        default:
            return state;
    }
};

export default authReducer;