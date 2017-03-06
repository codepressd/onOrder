import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  Login from '../pages/login';
import  Logout from '../pages/logout';

describe('Login Logout Renders', () => {


	it('Login Should Render ', () => {
		shallow(<Provider store={store}><Login /></Provider>);
		
      	});

      	it('Logout Should Render ', () => {
		shallow(<Provider store={store}><Logout /></Provider>);
		
      	});		   

});