import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Dropdown, Button, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import MediaQuery from 'react-responsive';

//User Actions
import { logoutUser, toggleUserMenu } from '../../../../Actions/userActions';


import './Header.css';

class BackEndHeader extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

handleClick(){
  this.props.logoutUser();

}

toggleVisibility(menu){
    const toggle = !menu;
    this.props.toggleUserMenu(toggle);
}

  render(){
    let cart = this.props.cart.length;
    const {menu} = this.props.activeUser;
    const {user} = this.props;
    let cartButton = '';
    let backendNav = 
          <Menu.Item as={Dropdown} text='Your Store'>
                  <Dropdown.Menu>
                          <Dropdown.Item onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id)}>Dashboard</Dropdown.Item>
                          <Dropdown.Item onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/products')}>Products</Dropdown.Item>
                          <Dropdown.Item onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/addProducts')}>Add Products</Dropdown.Item>
                          <Dropdown.Item onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/orders')}>Orders</Dropdown.Item>
                  </Dropdown.Menu>
          </Menu.Item>;

//If User is a restaurant

    if(user.role === 'restaurant'){
          cartButton =<Button
                basic
                onClick={()=>browserHistory.push('/restaurant/dashboard/'+user.id+'/checkout')}
                size='mini'
                className='cart'
                content='CART'
                icon='cart'
                label={{ as: 'a', basic: true, pointing: 'left', content: cart }}
          />;

          backendNav =
                   <Menu.Item as={Dropdown} text='Your Store'>
                            <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id)}>Dashboard</Dropdown.Item>
                                    <Dropdown.Item onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/shop')}>Shop</Dropdown.Item>
                                    <Dropdown.Item onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/orders')}>Orders</Dropdown.Item>
                            </Dropdown.Menu>
                  </Menu.Item>;
        }
    return(
      <div className="header">
          <MediaQuery minWidth={768}>
                <Menu  pointing secondary>
                      <Image onClick={()=> browserHistory.push('/')} src='/walrus-hat.png' alt='walrus'/>
                      <ul onClick={()=> browserHistory.push('/')} className="nav-brand">
                          <li className="myBrand">Salut.<span className="io">io</span></li>
                          <li className="tag-line">a better way to order</li>
                      </ul>
                  <Menu.Menu position='right'>
                         <span className="cart-button">{cartButton}</span>
                          <span className="backend-logout" onClick={()=> browserHistory.push('/logout')} >Logout</span>
                          {backendNav}
                  </Menu.Menu>
                </Menu>
          </MediaQuery>
        <MediaQuery maxWidth={767}>
        <Menu pointing secondary>
                  <img  onClick={()=> browserHistory.push('/')} className="walrus-nav" src='/walrus-hat.png' alt='walrus'/>
                  <span  onClick={()=> browserHistory.push('/')} className="myBrand">Salut.io</span>
                  <Menu.Menu position='right'>
                          {cartButton}
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


BackEndHeader.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = function(state){
  return{
    user: state.ActiveUser.user,
    cart: state.ActiveUser.cart
  }
}

function mapDispatchToProps(dispatch){
  return{
    logoutUser: bindActionCreators(logoutUser, dispatch),
    toggleUserMenu: bindActionCreators(toggleUserMenu, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackEndHeader);