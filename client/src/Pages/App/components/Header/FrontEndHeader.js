import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Dropdown, Button, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import MediaQuery from 'react-responsive';

import './Header.css';

//User Actions
import { toggleUserMenu } from '../../../../Actions/userActions';

class FrontEndHeader extends React.Component{

  constructor(props){
      super(props);
     this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(menu){
    const toggle = !menu;
    this.props.toggleUserMenu(toggle);
}

render(){
  const {menu} = this.props.activeUser;
  return (
    <div className="header">
    <MediaQuery minWidth={768}>
        <Menu className="navColor" pointing secondary>
         <Image src='/walrus-hat.png' alt='walrus'/>
        <ul onClick={()=> browserHistory.push('/')} className="nav-brand">
            <li className="myBrand">Salut.<span className="io">io</span></li>
            <li className="tag-line">a better way to order</li>
        </ul>
          <Menu.Menu position='right'>
            <Menu.Item name='Login'  active={this.props.location.pathname === '/login'} onClick={()=> browserHistory.push('/login')} />
            <Menu.Item name='Get Started >>'  active={this.props.location.pathname === '/signup'} onClick={()=> browserHistory.push('/signup')} />
          </Menu.Menu>
        </Menu>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
        <Menu pointing secondary>
                <img className="walrus-nav" src='/walrus-hat.png' alt='walrus'/>
                 <ul className="nav-brand">
                      <li className="myBrand">Salut.<span className="io">io</span></li>
                      <li className="tag-line">a better way to order</li>
                  </ul>
                  <Menu.Menu position='right'>
                          <Button icon onClick={this.toggleVisibility.bind(this, menu)}>
                                <Icon name='sidebar' />
                          </Button>
                  </Menu.Menu>
        </Menu>
        </MediaQuery>
    </div>
  )
}
}

FrontEndHeader.contextTypes = {
  router: React.PropTypes.object,
};


function mapDispatchToProps(dispatch){
  return{
    toggleUserMenu: bindActionCreators(toggleUserMenu, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(FrontEndHeader);