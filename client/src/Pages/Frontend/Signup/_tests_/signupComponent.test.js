import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  Signup from '../pages/signup';

describe('Signup Render', () => {


	it('Signup Should Render ', () => {
		shallow(<Provider store={store}><Signup /></Provider>);
		
      	});		   

});