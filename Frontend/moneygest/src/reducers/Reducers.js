import { combineReducers } from 'redux';

import authReducer from './authReducer'
import stockReducers from './stockReducers'
import appReducer from './appReducer'
import bodyReducer from './bodyReducer'

export default combineReducers({
    auth: authReducer,
    stock: stockReducers,
    app: appReducer,
    body: bodyReducer
});