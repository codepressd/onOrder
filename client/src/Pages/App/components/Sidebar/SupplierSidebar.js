/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button, Loader, Sidebar, Segment, List } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import classnames from 'classnames';


class SupplierSidebar extends React.Component{

	constructor (props){
		super(props);

	}

	render(){
		return(
			<div className='side-menu'>	
			<List >
				    <List.Item icon='dashboard' content='Dashboard' active={this.props.location.pathname === '/backend/dashboard'} onClick={()=> browserHistory.push('/backend/dashboard')}/>
				    <List.Item icon='tags' content='Products' active={this.props.location.pathname === '/backend/supplier/products'} onClick={()=> browserHistory.push('/backend/supplier/products')}/>
				    <List.Item icon='mail' content='Messages' disabled  />
				    
			</List>
			<Divider />
			<List >
				    <List.Item icon='users' content='Your Team'  active={this.props.location.pathname === '/backend/your-team'} onClick={()=> browserHistory.push('/backend/your-team')}/>
				    <List.Item icon='marker' content='Locations' disabled />
				    <List.Item icon='folder open outline' content='Orders'  active={this.props.location.pathname === '/backend/supplier/your-orders'} onClick={()=> browserHistory.push('/backend/supplier/your-orders')}/>
				    
			</List>
			<Divider />
	
			<List >
				    <List.Item icon='user' content='Customers' />
				    <List.Item icon='comment outline' content='Contact Us' />
				    
				    
			</List>
			<Divider />
			</div>
				

			)
	}

}


export default SupplierSidebar;