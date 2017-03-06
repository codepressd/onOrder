import React from 'react';
import { render }from 'react-dom';
import { syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import App from './App';
import {configureStore} from './store';
import './index.css';

const store = configureStore(window.__INITIAL_STATE__);
const mountApp= document.getElementById('root');

const history = syncHistoryWithStore(browserHistory, store);

render(
  <App store={store} history={history} />,
  mountApp
);
