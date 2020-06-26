
const initialState = { isLoggedIn: false, userDetails: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                userDetails: action.userDetails
            })
        case 'LOGOUT': 
            return Object.assign({}, state, {
                isLoggedIn: false,
                userDetails: null
            })
        default:
            return state;
    }
}

export default authReducer;