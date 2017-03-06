/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../Actions/userActions';
import { browserHistory } from 'react-router';

class Logout extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		this.props.logoutUser();
	}

	render(){
		return null;
	}
}
const mapStateToProps = function(state){
  return{
    activeUser: state.ActiveUser,
    logoutUser: logoutUser
  }
}

export default connect(null, {logoutUser})(Logout);