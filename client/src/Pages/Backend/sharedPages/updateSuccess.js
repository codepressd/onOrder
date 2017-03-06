/* eslint-disable */
import React from 'react';
import { Grid, Button, Container, Divider, Sidebar, Segment } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import{connect} from 'react-redux';

//Import styles
import '../backend.css';

//Import Top Bar
import Topbar from '../components/TopBar';

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

class UpdateSuccess extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		 const {user} = this.props;
		return(
		<div>
		<Topbar {...this.props} />
		<Sidebar.Pushable as={Segment}>
		        <MobileMenu  {...this.props}/>
		        <Sidebar.Pusher>
                  		<Segment basic>
			<div className='pageWrap'>
				<Grid verticalAlign='middle' columns={1} centered>
					<Container>
					<h1>Updated Successfully</h1>
					</Container>
					<Divider hidden />
					<Container>
					<Button.Group>
					    <Button onClick={() => browserHistory.push('/backend/dashboard')}>Dashboard</Button>
					    <Button.Or />
					    <Button onClick={() => browserHistory.push('/backend/profile')} positive>Profile</Button>
					</Button.Group>
					</Container>
				</Grid>
			</div>
			</Segment>
        		        </Sidebar.Pusher>
		</Sidebar.Pushable>
		</div>
		)
	}
}
export default connect(
  state => ({
    user: state.ActiveUser.user
  })
)(UpdateSuccess);