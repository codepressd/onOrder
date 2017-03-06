/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// Import Reducers

import ActiveUser from './Reducers/userReducer';
import Products from './Reducers/cartProductReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  ActiveUser,
  Products,
  routing: routerReducer
});