/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button, Loader, Sidebar, Segment, List, Table } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import classnames from 'classnames';

import '../backend.css';

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//Import Top Bar
import Topbar from '../components/TopBar';

//import Actions
import {updateUserData, changePassword, checkUserToken, userResetFetch} from '../../../Actions/userActions';//send to database

class Profile extends React.Component{

	constructor (props){
		super(props);

	}

	componentWillMount(){
		const{token} = this.props.activeUser;
		const {userId} = this.props.activeUser.user;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	render(){
		const serverErrors = this.props.activeUser.error || '';
		const {user, success, userIsFetching} = this.props.activeUser;
		

		if(userIsFetching || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){
			return(
			<div>
			<Topbar {...this.props} />
			<Sidebar.Pushable as={Segment}>
			        
			        <MobileMenu  {...this.props}/>
			        <Sidebar.Pusher>
                  			<Segment basic>
				<div className='pageWrap'>
				
					
					<Container>
					<Header as='h1' >
						PROFILE
					</Header> 
					<Table >
						<Table.Body>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='building outline' /> Company Name
								</Table.Cell>
								<Table.Cell>
									{user.companyName}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> Username/Email
								</Table.Cell>
								<Table.Cell>
									{user.email}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> First Name
								</Table.Cell>
								<Table.Cell>
									{user.firstName}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> Last Name
								</Table.Cell>
								<Table.Cell>
									{user.lastName}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='mobile' /> Phone
								</Table.Cell>
								<Table.Cell>
									{user.phone}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='home' /> Address
								</Table.Cell>
								<Table.Cell>
									{user.address}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> City
								</Table.Cell>
								<Table.Cell>
									{user.city}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> State
								</Table.Cell>
								<Table.Cell>
									{user.state}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='photo' /> Profile Picture
								</Table.Cell>
								<Table.Cell>
									<Image src='/walrus-hat-noimage.jpg' size='small' />
								</Table.Cell>
							</Table.Row>
							
						</Table.Body>
					</Table>
					<div className='formWrap'>
						<Button  onClick={() => browserHistory.push('/backend/change-password')} floated='right'>Change Password</Button>
						<Button  onClick={() => browserHistory.push('/backend/change-profile')} floated='right'>Edit  Profile</Button>
					</div>
					</Container>
					
				</div>
				</Segment>
        			        </Sidebar.Pusher>
			</Sidebar.Pushable>
			</div>
			)}else{
				browserHistory.push('/login');
			}
	}

}

function mapDispatchToProps(dispatch){
	return{
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (Profile);