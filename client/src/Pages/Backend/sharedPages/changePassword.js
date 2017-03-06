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

class ChangePassword extends React.Component{

	constructor (props){
		super(props);

		this.state ={
			errors: {},
		}

		this.handleResetPassword = this.handleResetPassword.bind(this);
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

	validateInput (data) {
	        let errors = {};

	        Object.keys(data).map(function(objectKey, index) {
	            let value = data[objectKey];

	            if (typeof value == 'string' && value.length < 1) {

	                errors[objectKey] = 'This Field Is Required';

	            }
	            
	        });
	        
	        if (data.newPassword !== data.confirmPassword) {
	            errors.newPassword = 'Passwords Don\'t Match';
	            errors.confirmPassword = 'Passwords Don\'t Match';
	        }
	        
	        return {
	            errors
	        }

	}

	
	handleResetPassword(e, data){
		e.preventDefault();
		const { errors} = this.validateInput(data.formData);

		if (Object.keys(errors).length !== 0) {
		            this.setState({ errors });
		 }

		if (Object.keys(errors).length === 0) {
		            this.setState({
		                errors: {},
		            });
		           data.formData.userId = this.props.activeUser.user.userId;
		          
		           this.props.changePassword(data.formData);
		}

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
						CHANGE PASSWORD
					</Header> 
						  <div className='formWrap'>
						      <Form onSubmit={this.handleResetPassword}>
        							
        							
	  							<Form.Input 
	  							icon='lock'
        								iconPosition='left' 
        								label={serverErrors.passwordError && serverErrors.passwordError || 'Old Password'} 
        								 className={classnames({'error': serverErrors.passwordError})} 
        								 name='oldPassword' 
        								 type='password'  
        								 placeholder='Old Password' required/>
	  							<Form.Input
	  							icon='lock'
	  							iconPosition='left'
	  							label={errors.newPassword && errors.newPassword ||'New Password'}
	  							 className={classnames({'error': errors.newPassword})} 
	  							 name='newPassword' 
	  							 type='password' 
	  							 placeholder={errors.newPassword && errors.newPassword ||'New Password'} required/>
	  							<Form.Input 
	  							icon='lock'
	  							iconPosition='left'
	  							label={errors.confirmPassword && errors.confirmPassword ||'Confirm Password'} 
	  							className={classnames({'error': errors.confirmPassword})} 
	  							name='confirmPassword' 
	  							type='password' 
	  							placeholder={errors.confirmPassword && errors.confirmPassword ||'Confirm Password'} required/>
  							
  							<Button color='blue' type='submit' floated='right'>Reset Password</Button>
          						       </Form>
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
		changePassword: bindActionCreators(changePassword, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (ChangePassword);