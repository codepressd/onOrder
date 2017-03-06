/* eslint-disable */
import React from 'react';
import { Container, Grid, Form, Icon, Header, Checkbox, Button, Sidebar, Segment, Image } from 'semantic-ui-react';
import { loginRequest, userResetFetch } from '../../../../Actions/userActions.js';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';


//Login css
import '../login.css';

//Redirect User Helpers
import {userLoggedRedirect} from '../../../../Helpers/userHelpers';

//Import Mobile Menu
import MobileMenu from '../../../../Sidebar/mobileMenu';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
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

    validateInput (data){
             let errors = {};
             Object.keys(data).map(function(objectKey, index) {
                 let value = data[objectKey];

                 if (typeof value == 'string' && value.length < 1) {

                     errors[objectKey] = 'This Field Is Required';

                 }

             });

             return {
                 errors
             }

    }

    handleSubmit(e, data) {
        e.preventDefault();
        const { errors} = this.validateInput(data.formData);
      
        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        }

        if (Object.keys(errors).length === 0) {
            this.setState({
                errors: {},

            });           
            this.props.loginRequest(data.formData);
        }
    }

    render() {
         const { errors } = this.state;
         const {message} = this.props.activeUser; 
         const serverErrors = this.props.activeUser.error;
        return (
                  <Sidebar.Pushable as={Segment}>
                                    <MobileMenu  {...this.props}/>
                                    <Sidebar.Pusher>
                                                    <Segment basic>
                                                    <Container className='fullPage'>        
                                                    <Image src='/walrus-hat.png' centered/>       
                                        		<Header as='h2' textAlign='center'>
                                        		      <Header.Content>
                                        		        Login
                                        		      </Header.Content>
                                                              <div>
                                                                        {message}
                                                                        {serverErrors.password}
                                                                        {serverErrors.email}
                                                              </div>
                                        		 </Header>

                                        		<Grid verticalAlign='middle' columns={1} centered>
                                                        		                  <Form onSubmit={this.handleSubmit}>
                                                            			<Form.Group  widths='equal' >
                                                            			          <Form.Input label={errors.email && errors.email || 'Email'} className={classnames({'error': errors.email})} name='email' placeholder={errors.email && errors.email || 'Email'} required />
                                                            			          <Form.Input label={errors.password && errors.password ||'Password'} type='password' className={classnames({'error': errors.password})} name='password' placeholder={errors.password && errors.password ||'Password'} required />
                                                            		        	</Form.Group>
                                                        		                 <Button type='submit'>Submit</Button>
                                                        		                 </Form>
                                        		</Grid>
                                            
                                        	         </Container>

                                                      </Segment>
                                    </Sidebar.Pusher>
                 </Sidebar.Pushable>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        loginRequest: bindActionCreators(loginRequest ,dispatch),
        userResetFetch: bindActionCreators(userResetFetch ,dispatch),
        userLoggedRedirect: bindActionCreators(userLoggedRedirect ,dispatch)

    }    
}
Login.propTypes = {
    loginRequest: React.PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login);
