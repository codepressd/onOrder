/**
 * Main store function
 */
 import {routerMiddleware} from 'react-router-redux';
 import {browserHistory} from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import DevTools from './Pages/App/components/DevTools';
import rootReducer from './reducers';

import {loadUserState, saveUserState} from './Helpers/localStorage';

export function configureStore() {

const persistedUserState = loadUserState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

  // Middleware and store enhancers
  const enhancers = composeEnhancers(
    applyMiddleware(thunk, routingMiddleware),
  );

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, persistedUserState, enhancers);

//persist state

store.subscribe(throttle(() => 
  saveUserState({
    ActiveUser: store.getState().ActiveUser
  }),1000));

  return store;
}