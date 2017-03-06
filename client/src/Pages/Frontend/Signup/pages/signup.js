/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import{bindActionCreators} from 'redux';
import {signupRequest, userResetFetch} from '../../../../Actions/userActions.js';
import { Container, Header, Icon, Grid, Image, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Divider, Sidebar, Segment } from 'semantic-ui-react';
import classnames from 'classnames';

// Import Style
import '../signup.css';

//Redirect User Helpers
import {userLoggedRedirect} from '../../../../Helpers/userHelpers';

//Import Mobile Menu
import MobileMenu from '../../../../Sidebar/mobileMenu';

const region = [
    { text: '', value: '' },
    { text: 'Northern Nevada', value: 'northNevada' },
    { text: 'Southern Nevada', value: 'southNevada' },
]

const role = [
    { text: '', value: '' },
    { text: 'Restaurant', value: 'restaurant' },
    { text: 'Supplier', value: 'supplier' },
    { text: 'Supplier & Restaurant', value: 'supplier-restaurant' },
]

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {}

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

    validateInput (data) {
        let error = {};
        let typeOfUser = '';

        Object.keys(data).map(function(objectKey, index) {
            let value = data[objectKey];

            if (typeof value == 'string' && value.length < 1) {

                error[objectKey] = 'This Field Is Required';

            }
           
        });
        
        return {
            error,
            typeOfUser
        }

    }

    handleSubmit(e, data) {
        e.preventDefault();
        const { error, typeOfUser} = this.validateInput(data.formData);

        if (Object.keys(error).length !== 0) {
            this.setState({ error });
        }

        if (Object.keys(error).length === 0) {
            this.setState({
                error: {},
            });
            data.formData.isChild = false;
            data.formData.childRole = '';
            data.formData.parentId = '';
            const newUser = data.formData;
            this.props.signupRequest(newUser);
        }
    }
    render() {
        const {message} = this.props.activeUser; 
         const {error} = this.props.activeUser;
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
                                                                                  {message}
                                                </Header>
                                                <Grid verticalAlign='middle' columns={1} centered>
                                                  <Form onSubmit={this.handleSubmit}>
                                        
                                                  <Form.Input label={error.email && error.email || 'Email'} className={classnames({'error': error.email})} name='email' placeholder={error.email && error.email || 'Email'} required />
                                                  <Form.Input label={error.password && error.password ||'Password'} type='password' className={classnames({'error': error.password})} name='password' placeholder={error.password && errors.password ||'Password'} required />
                                                  <Form.Input label={error.password && error.password ||'Business Name'}  className={classnames({'error': error.business-name})} name='businessName' placeholder={error.business-name && errors.business-name ||'Business Name'} required />
                                                  <Form.Select className={classnames({'error': error.role})} label='Business Type'  name='role' options={role} placeholder={error.role && error.role||'Business Type'}  required />
                                                  <Form.Select className={classnames({'error': error.region})} label='Region'  name='region' options={region} placeholder={error.region && error.region||'Business Region'}  required />
                                                
                                                 <Button type='submit'>Sign Up For Free!</Button>
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
        signupRequest: bindActionCreators(signupRequest ,dispatch),
        userResetFetch: bindActionCreators(userResetFetch ,dispatch),
        userLoggedRedirect: bindActionCreators(userLoggedRedirect ,dispatch),
    }    
}

Signup.propTypes = {
    signupRequest: React.PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Signup);
