/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Form,  Header, Rating, Button, Loader, Input, Dropdown, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


import  '../backend.css';


class SearchBar extends React.Component{
	constructor(props){
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e, data){
		e.preventDefault();
		const {userId, userView} = this.props.activeUser.user;

		this.props.searchProducts(data.formData, userId, userView);

	}

	render(){


		return(
			<div className='search'>
			<Form onSubmit={this.handleSearch} >
				<Input name='search' icon='search' placeholder='Search...' />
			</Form>
			</div>
		
		)
	}

}


export default SearchBar;