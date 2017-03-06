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
import {
	updateUserData,
 	changePassword, 
 	checkUserToken, 
 	userResetFetch,
 	childUserInfo} from '../../../Actions/userActions';//send to database

class ChildProfile extends React.Component{

	constructor (props){
		super(props);

	}

	componentWillMount(){
		const {token} = this.props.activeUser;
		const {userId} = this.props.activeUser.user;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
		this.props.childUserInfo(this.props.params.memberId);

	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	render(){
		const serverErrors = this.props.activeUser.error || '';
		const {success, userIsFetching} = this.props.activeUser;
		const childInfo = this.props.activeUser.childInfo.childUserInfo;

		if(userIsFetching || !success || !childInfo){
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
									<Icon name='user' /> Username/Email
								</Table.Cell>
								<Table.Cell>
									{childInfo.email}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> First Name
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.firstName}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> Last Name
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.lastName}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='mobile' /> Phone
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.phone}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='home' /> Address
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.address}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> City
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.city}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> State
								</Table.Cell>
								<Table.Cell>
									{childInfo.profile.state}
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
						<Button  onClick={() => browserHistory.push('/backend/change-password')} floated='right'>Remove User</Button>
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
		childUserInfo: bindActionCreators(childUserInfo, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (ChildProfile);