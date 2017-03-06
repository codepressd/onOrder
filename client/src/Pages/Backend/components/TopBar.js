/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button, Loader, Input, Dropdown, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

//Import Helpers
import {getPageTitle} from './helpers';

//Import Search Bar
import SearchBar from './SearchBar';


import  '../backend.css';



class TopBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {userView, firstName, companyName} = this.props.activeUser.user;
		const trigger = (
			  <span className='small-brand'>
			    <Image avatar src='/profileshot.jpg' />
			    {firstName+' @ '+companyName}
			   </span>

		)

		
		let pageTitle = getPageTitle(this.props.location.pathname);
		let searchBar = ''
		let cart = '';

		if (this.props.product){
			pageTitle = this.props.product.title;
		}

		if (userView === 'restaurant'){
			cart = <Button animated='vertical'>
				      <Button.Content hidden>20 Items</Button.Content>
				      <Button.Content visible>
				        <Icon name='shop' />
				      </Button.Content>
				</Button>
		}

		if(pageTitle === 'SHOP' || pageTitle === 'PRODUCTS'){
			
			return (
			<div className='top-bar'>

				<div className='heading'>
					<h1>{pageTitle}</h1>
				</div>
				<SearchBar {...this.props} />
				<div className='right-nav'>
				{cart}
				<Dropdown trigger={trigger} pointing='top left' icon={null}>
				    <Dropdown.Menu>
				      <Dropdown.Item text='Profile' icon='user' onClick={()=> browserHistory.push('/backend/profile')} />
				      <Dropdown.Item text='Sign Out' icon='sign out' onClick={()=> browserHistory.push('/logout')}  />
				    </Dropdown.Menu>
				 </Dropdown>
				 </div>
			
			</div>
			)

		}else{

			return(
				<div className='top-bar'>

					<div className='heading'>
						<h1>{pageTitle}</h1>
					</div>
					<div className='right-nav'>
					{cart}
					<Dropdown trigger={trigger} pointing='top left' icon={null}>
					    <Dropdown.Menu>
					      <Dropdown.Item text='Profile' icon='user' onClick={()=> browserHistory.push('/backend/profile')} />
					      <Dropdown.Item text='Sign Out' icon='sign out' onClick={()=> browserHistory.push('/logout')}  />
					    </Dropdown.Menu>
					 </Dropdown>
					 </div>
				

				</div>
			
			)
		}
	}

}
function mapStateToProps(state){
	return{
		user: state.ActiveUser.user
	}
}


export default connect(mapStateToProps) (TopBar);