import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  App from '../App';
import  Footer  from '../components/Footer/Footer';
import  BackendHeader  from '../components/Header/BackendHeader';
import  FrontendHeader  from '../components/Header/FrontEndHeader';

describe('App Components Render', () => {


        it('App Should Render ', () => {
          shallow(<Provider store={store}><App /></Provider>);
          
              });      

        it('Footer Should Render ', () => {
          shallow(<Provider store={store}><Footer /></Provider>);
          
              });     

        it('BackendHeader Should Render ', () => {
          shallow(<Provider store={store}><BackendHeader /></Provider>);
          
              });     

        it('FrontendHeader Should Render ', () => {
          shallow(<Provider store={store}><FrontendHeader /></Provider>);
          
              });     

});