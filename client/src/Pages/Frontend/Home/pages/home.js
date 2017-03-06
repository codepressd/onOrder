/* eslint-disable */
import React  from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import{bindActionCreators} from 'redux';
import { Container, Header, Icon, Grid, Image, Sidebar, Segment, Divider, Button } from 'semantic-ui-react';


//close menu 
import {userResetFetch} from '../../../../Actions/userActions.js';

//Redirect User Helpers
import {userLoggedRedirect} from '../../../../Helpers/userHelpers';


// Import Style
import  '../home.css';

import MobileMenu from '../../../../Sidebar/mobileMenu';

class HomePage extends React.Component{
    constructor(props){
              super(props);
    }
    componentWillMount(){
      if(this.props.activeUser.user){
        const {userView} = this.props.activeUser.user;
         this.props.userLoggedRedirect(userView);
      }

    }
    componentWillUnmount(){
    this.props.userResetFetch();
  }

render() {


  return (
   
      <Sidebar.Pushable as={Segment}>
               <MobileMenu  {...this.props}/>
                <Sidebar.Pusher>
                        <Segment basic>
                            <section className="intro">
                                    <div className="intro-content">
                                          <p className="headline">Order from all your existing suppliers in one stop</p>
                                          <div className="get-started">
                                                <Button content='Start Now' onClick={() => browserHistory.push('/signup')} color='blue' icon='right arrow' labelPosition='right' />
                                          </div>
                                    </div>
                            </section>
                            <section className="grid-points">
                            <Grid className="grid" columns={3} divided centered stackable>
                                                  <Grid.Row>
                                                    <Grid.Column>
                                                      <p className="headline no-pad">All your suppliers on a single site</p>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <p className="headline no-pad">Easy To Order</p>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                      <p className="headline no-pad">Access Invoices for Quick Re-Ordering</p>
                                                    </Grid.Column>
                                                  </Grid.Row>
                                  </Grid>
                            </section>
                            <section className="bar-shot">
                                  <div className="bar-content">
                                          <p className="headline">Hunting Down Each & Every Supplier Is Like Beating a Dead Horse</p>
                                          <p className="description plus-pad">Ordering your supplies (from seasonal fruits, to seafood, to wine, to linens and printer paper) should be the quick and easy part of your day. </p>
                                          <p className="description plus-pad">Instead of calling, texting, emailing and faxing each order by itself, with Salut your supplies are ordered all together. We send separate orders to each supplier for you so you can focus your time elsewhere.</p>
                                  </div>
                            </section>
                            <section className="light-blue">
                            <p className="white-headline ">Salut was built by a GM to save time & Reduce Headaches</p>
                                    <div className="grid-points">
                                              <Grid className="grid" columns={3} divided centered stackable>
                                                            <Grid.Row>
                                                              <Grid.Column>
                                                                  <Image src='/work-fork.jpg' />
                                                                  <p className="description">order from one, four or allof your suppliers at once</p>
                                                              </Grid.Column>
                                                              <Grid.Column>
                                                                  <Image src='/work-juice.jpg' />
                                                                  <p className="description">orders are individually sent to each mechant for you</p>
                                                              </Grid.Column>
                                                              <Grid.Column>
                                                                  <Image src='/work-tray.jpg' />
                                                                  <p className="description">orders are stored online for easy re-ordering & verification</p>
                                                              </Grid.Column>
                                                            </Grid.Row>
                                             </Grid>
                                  </div>
                            </section>
                            <section className="multi-login">
                                  <div className="intro-content">
                                          <p className="headline">Multiple User Log in</p>
                                          <div className="get-started">
                                                <p className="description">Access, verify & share invoices with all of your staff. You'll never lose an order again, and everyone stays on the same page for receiving orders, bookkeeping and future ordering!</p>
                                          </div>
                                    </div>
                            </section>
                            <section className="order-anywhere">
                                    <div className="anywhere-content">
                                          <p className="white-headline no-line">Order anywhere, Anytime</p>
                                          <p className="description">Order on the fly from every corner of your restaurant or on the road</p>
                                          <p className="white-description">Log in on your laptop, desktop or mobile device</p>
                                    </div>
                            </section>
                            <section className="start-now">
                                  <div className="start-content">
                                          <Image src='/walrus-hat.png' centered/>
                                          <p className="headline light-weight">Upgrade your Ordering. Try Salut For Free!</p>
                                          <div className="get-started">
                                                
                                                <p className="description click-me" onClick={() => browserHistory.push('/signup')}>Sign Up Now >></p>
                                          </div>
                                    </div>
                            </section>
                         </Segment>
                </Sidebar.Pusher>
      </Sidebar.Pushable>
 
  )
}
}
function mapDispatchToProps(dispatch){
    return{
        userResetFetch: bindActionCreators(userResetFetch ,dispatch),
        userLoggedRedirect: bindActionCreators(userLoggedRedirect ,dispatch)

    }    
}



export default connect(null, mapDispatchToProps)(HomePage);