import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Menu } from 'semantic-ui-react';


// Import Style
import styles from './Header.css';

//Import Headers

import BackEndHeader from './BackendHeader';
import FrontEndHeader from'./FrontEndHeader';

const mapStateToProps = function(state){
  return{
    activeUser: state.ActiveUser
  }
}
let ActiveHeader = null;

class Header extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    // console.log(this.props.activeUser);
    // let ActiveHeader = FrontEndHeader;
    // if (this.props.activeUser.user !== null){
    //   ActiveHeader = BackEndHeader;
    // }
    const Header = ({activeUser: {user}}) => user ? <FrontEndHeader /> : <BackEndHeader />;
    return(
      <Header  />
      )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Header);
