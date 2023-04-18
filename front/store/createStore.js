import { createStore } from 'redux';
import rootReducer from 'store/reducers/rootReducer';

export default (initialState = {}) => createStore(rootReducer, initialState);
