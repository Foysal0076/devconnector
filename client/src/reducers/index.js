import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducers from './profileReducers'
import postReducer from './postReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducers,
    post: postReducer,
})