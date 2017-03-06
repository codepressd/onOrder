/* eslint-disable */
import React from 'react';
import {browserHistory} from 'react-router';
import { Menu, Icon, Sidebar, Dropdown, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

import '../Styles/mobileMenu.css';


 class MobileMenu extends React.Component {

      constructor(props) {
                  super(props);
      }

    render() {

      const {menu, user} = this.props.activeUser;

      let frontEnd = '';
      let backEnd = '';
      let cartButton = '';
      const nonLoggedIn =<Menu.Item>
                                                                {/*<Menu.Item  name='Home' active={this.props.location.pathname === '/'} onClick={() => browserHistory.push( '/')} />
                                                                <Menu.Item  name='About' active={this.props.location.pathname === '/about'}  onClick={() => browserHistory.push('/about')} />
                                                                <Menu.Item  name='Faq' active={this.props.location.pathname === '/faq'} onClick={() => browserHistory.push('/faq')} />*/}
                                                                <Menu.Item  name='Signup' active={this.props.location.pathname === '/signup'} onClick={() => browserHistory.push('/signup')} />
                                                                <Menu.Item  name='Login' active={this.props.location.pathname === '/login'} onClick={() => browserHistory.push('/login')} />
                                                        </Menu.Item>;
      const loggedIn =<Menu.Item>
                                                         <Icon name='user' />
                                                        {/*<Menu.Header>Front End</Menu.Header>
                                                        <Menu.Item  name='Home' active={this.props.location.pathname === '/'} onClick={() => browserHistory.push( '/')} />
                                                        <Menu.Item  name='Faq' active={this.props.location.pathname === '/faq'} onClick={() => browserHistory.push( '/faq')} />
                                                        <Menu.Item  name='About' active={this.props.location.pathname === '/about'} onClick={() => browserHistory.push( '/about')} />*/}
                                                        <Menu.Item  name='Logout'  onClick={()=> browserHistory.push('/logout')} />
                                                </Menu.Item>;      

      // const supplierBackend = <Menu.Item>
      //                                                                      <Icon name='settings' />
      //                                                                     <Menu.Header>Back End</Menu.Header>
      //                                                                     <Menu.Item  name='Dashboard' active={this.props.location.pathname === '/'+user.role+'/dashboard/'+user.id} onClick={() => browserHistory.push( '/'+user.role+'/dashboard/'+user.id)} />
      //                                                                     <Menu.Item  name='Products' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/products'} onClick={() => browserHistory.push( '/supplier/dashboard/'+user.id+'/products')} />
      //                                                                     <Menu.Item  name='Add Products' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/addProducts'} onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/addProducts')} />
      //                                                                     <Menu.Item  name='Orders' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push( '/supplier/dashboard/'+user.id+'/orders')} />
      //                                                             </Menu.Item>;

      // const restaurantBackend = <Menu.Item>
      //                                                                              <Icon name='settings' />
      //                                                                             <Menu.Header>Back End</Menu.Header>
      //                                                                             <Menu.Item  name='Dashboard' active={this.props.location.pathname === '/'+user.role+'/dashboard/'+user.id} onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id)}/>
      //                                                                             <Menu.Item  name='Shop' active={this.props.location.pathname === '/restaurant/dashboard/'+user.id+'/shop'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/shop')} />
      //                                                                             <Menu.Item  name='Orders' active={this.props.location.pathname === '/restaurant/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/orders')} />
      //                                                                             <Button
      //                                                                                     basic
      //                                                                                     onClick={()=>browserHistory.push('/restaurant/dashboard/'+user.id+'/checkout')}
      //                                                                                     size='small'
      //                                                                                     className='cart'
      //                                                                                     content='CART'
      //                                                                                     icon='cart'
      //                                                                                     label={{ as: 'a', basic: true, pointing: 'left', content: cart }}  />
      //                                                                     </Menu.Item>;


         if(!user) {

                  frontEnd = nonLoggedIn;

         }else if (user && user.role === 'restaurant'){

                  frontEnd = loggedIn;
                  backEnd = <Menu.Item>
                                                      <Menu.Item  name='Dashboard' active={this.props.location.pathname === '/'+user.role+'/dashboard/'+user.id} onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id)}/>
                                                      <Menu.Item  name='Shop' active={this.props.location.pathname === '/restaurant/dashboard/'+user.id+'/shop'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/shop')} />
                                                      <Menu.Item  name='Orders' active={this.props.location.pathname === '/restaurant/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/orders')} />
                                              </Menu.Item>;

         } else if (user.role === 'supplier' ) {

                  frontEnd = loggedIn;
                  backEnd = <Menu.Item>
                                                     <Divider />
                                                    <Menu.Item  name='Dashboard' active={this.props.location.pathname === '/'+user.role+'/dashboard/'+user.id} onClick={() => browserHistory.push( '/'+user.role+'/dashboard/'+user.id)} />
                                                    <Menu.Item  name='Products' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/products'} onClick={() => browserHistory.push( '/supplier/dashboard/'+user.id+'/products')} />
                                                    <Menu.Item  name='Add Products' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/addProducts'} onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/addProducts')} />
                                                    <Menu.Item  name='Orders' active={this.props.location.pathname === '/supplier/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push( '/supplier/dashboard/'+user.id+'/orders')} />
                                            </Menu.Item>;

         }

          return (
            <Sidebar as={Menu} animation='push' width='thin' direction='right' visible={menu} icon='labeled' vertical inverted>
                  {frontEnd}
                  {backEnd}                  
            </Sidebar>
           
          )
      }
}

export default connect()(MobileMenu);