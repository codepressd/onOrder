import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  Home from '../pages/home';

describe('Home Page Render', () => {


	it('Home Should Render ', () => {
		shallow(<Provider store={store}><Home /></Provider>);
		
      	});		   

});