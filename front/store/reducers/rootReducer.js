import { combineReducers } from 'redux';
import auth from './authReducer';
import toasts from './toastReducer';
import search from './searchReducer';

export default combineReducers({
    auth,
    toasts,
    search,
});
