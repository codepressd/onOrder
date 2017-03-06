/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Sidebar, Segment, Header, Card, Button, Divider, Icon, List } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';



//import user Actions
import {checkUserToken, userResetFetch, getTeamMembers} from '../../../Actions/userActions';//update state with products

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//import Top Bar
import TopBar from '../components/TopBar';

//Import TeamMember

import TeamMember from '../components/Shared/TeamMember';

import  '../backend.css';

class TeamMembers extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const {user} = this.props;
		const{token} = this.props.activeUser;
		const userId = {
			userId : user.userId
		}

		const userInfo = {
			token,
			userId: user.userId
		}
		this.props.checkUserToken(userInfo);

		this.props.getTeamMembers(user.userId);
		
	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	render(){
		const{user} = this.props;
		const {message, members} = this.props.activeUser;
		const{products} = this.props;
		let imageUrl =  '/walrus-hat-noimage.jpg';

		const {success, userIsFetching} = this.props.activeUser;
		

		if(userIsFetching || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){
			return(
			<div>
			<TopBar {...this.props} />
			<Sidebar.Pushable as={Segment}>
			        <MobileMenu  {...this.props}/>
			        <Sidebar.Pusher>
                  			<Segment basic>
				<div className='pageWrap'>
					<Container>
					<Header as='h1' >
						YOUR TEAM
					</Header> 
						<div className='add'>
							<Icon  link onClick={() => browserHistory.push('/backend/add-team-member')} name='add circle' size='huge' />
						</div>
						<div className='teamMessage'>{message}</div>
						<List className='team' relaxed>

							{members.map((member, index) => <TeamMember {...this.props} key={index} index={index} teamMember={member} /> )}
						    
						</List>

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

function mapStateToProps(state){
	return {
		user: state.ActiveUser.user
	}

}

function mapDispatchToProps(dispatch){
	return{
		getTeamMembers: bindActionCreators(getTeamMembers, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamMembers);

