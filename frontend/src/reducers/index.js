import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addThreadReducer from './addThreadReducer';
import getAllThreadReducer from './getAllThreadReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    addThread: addThreadReducer,
    getAllThread: getAllThreadReducer,
});