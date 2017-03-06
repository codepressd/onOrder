/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button, Loader, Sidebar, Segment, List } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import classnames from 'classnames';


//import Sidebars

import RestaurantSidebar from './RestaurantSidebar';
import SupplierSidebar from './SupplierSidebar';


class BackendSidebar extends React.Component{

	constructor (props){
		super(props);

	}

	render(){
		const {role, userView} = this.props.activeUser.user;
		let Layout = RestaurantSidebar;
		let viewToggle = '';
		if(userView === 'supplier'){

			Layout = SupplierSidebar;
		}
		if (role === 'supplier-restaurant'){
			viewToggle = 
			<div className='toggle-wrap'>
				<Button.Group>
				    <Button>Restaurant</Button>
				    <Button.Or />
				    <Button positive>Supplier</Button>
				</Button.Group>
			<Divider />
			</div>;
		}
		return(
			<div className='sidebar-menu'>
				<div className='logo-contain'>
					<p className='backendBrand'>Salut</p>
				</div>
				{viewToggle}
				<Layout {...this.props} />
			</div>

		)
	}

}


export default BackendSidebar;