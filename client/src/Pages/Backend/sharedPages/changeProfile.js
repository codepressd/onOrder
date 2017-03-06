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

class ChangeProfile extends React.Component{

	constructor (props){
		super(props);

		this.state ={
			errors: {},
		}

		this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
	}

	componentWillMount(){
		const{token} = this.props.activeUser;
		const userId = this.props.activeUser.user.id;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	validateInput (data, user) {
	        let newData = {};

	        Object.keys(data).map(function(objectKey, index) {
	            let value = data[objectKey];
	           
	            if (typeof value === 'string' && value.length < 1) {
	            	newData[objectKey] = user[objectKey];
	            	if(newData[objectKey] === undefined){
	            		newData[objectKey] = '';
	            	}

	            }else if(typeof value === null || typeof value === undefined){
	            	newData[objectKey] = '';
	            }else{
	            	newData[objectKey] = value;
	            }
	           
	        });

	           return {
	           	newData
	        }

	}

	handleInfoSubmit(e, data){
		e.preventDefault();

		let validData = this.validateInput(data.formData, this.props.activeUser.user);
		validData.newData.userId = this.props.activeUser.user.userId;
		validData.newData.profileImage= '';
		this.props.updateUserData(validData);
		

	}

	render(){

		const {errors} =this.state;
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
					<Form onSubmit={this.handleInfoSubmit}>
					<Table >
						<Table.Body>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='building outline' /> Company Name
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='companyName' placeholder={user.companyName} />
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> Username/Email
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='email' placeholder={user.email} />
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> First Name
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='firstName' placeholder={user.firstName} />
									
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='user' /> Last Name
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='lastName' placeholder={user.lastName} />
									
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='mobile' /> Phone
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='phone' placeholder={user.phone} />
									
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='home' /> Address
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='address' placeholder={user.address} />
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> City
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='city' placeholder={user.city} />
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell collapsing>
									<Icon name='marker' /> State
								</Table.Cell>
								<Table.Cell>
									<Form.Input  name='state' placeholder={user.state} />
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
						<Button color='blue' type='submit' floated='right'>Update Profile</Button>
					</div>
					</Form>
									
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
		updateUserData: bindActionCreators(updateUserData, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (ChangeProfile);