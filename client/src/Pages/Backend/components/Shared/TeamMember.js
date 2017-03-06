/* eslint-disable */
import React, { PropTypes } from 'react';
import { Card , Divider, Image, Button, List} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

//Import Title Helper
import { getPageTitle } from '../helpers';

class TeamMember extends React.Component {
    constructor(props) {
        super(props);
        
    }


    render() {
      
        const { teamMember, user } = this.props;
        let imageUrl =  '/walrus-hat-noimage.jpg';
        const userJob = getPageTitle(teamMember.childRole);

        if (teamMember.profile.profileImage.length !== 0) {
            imageUrl = teamMember.profile.profileImage;
        }

        return (
          <List.Item>
            <Image avatar src={imageUrl} />
            <List.Content>
              <List.Header onClick={() => browserHistory.push('/backend/member-profile/'+teamMember._id)} as='a'>{teamMember.profile.firstName} {teamMember.profile.lastName} - {teamMember.email}</List.Header>
              <List.Description>{userJob}</List.Description>
            </List.Content>
          </List.Item>
         
        )
    }
}

function mapStateToProps(state) {
    return {
        //user: state.activeUser.user,
    }
}

function mapDispatchToProps (dispatch){
	return{
		//getPageTitle: bindActionCreators(getPageTitle, dispatch)
	}
}


export default connect(mapStateToProps,mapDispatchToProps) (TeamMember);