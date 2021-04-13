import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducers from './profileReducers'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducers,
})