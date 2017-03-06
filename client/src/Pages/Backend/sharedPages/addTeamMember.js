/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import{bindActionCreators} from 'redux';

import { Container, Header, Icon, Grid, Table, Image, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Divider, Sidebar, Segment } from 'semantic-ui-react';
import classnames from 'classnames';

//User Actions
import {signupRequest, userResetFetch} from '../../../Actions/userActions.js';

// Import Style
import '../backend.css';

//import top bar
import TopBar from '../components/TopBar';

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

const role = [
    { text: '', value: '' },
    { text: 'Sales Representative', value: 'sales-representative' },
    { text: 'Department Manager', value: 'department-manager' },
    { text: 'Regional Manager', value: 'regional-manager' },
];

const restaurantRole = [
    { text: '', value: '' },
    { text: 'Manager', value: 'manager' },
    { text: 'Kitchen Manager', value: 'kitchen-manager' },
    { text: 'General Manager', value: 'General-manager' },
];

class ChildUserSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }
    componentWillMount(){
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

            data.formData.isChild = true;
            data.formData.role = this.props.activeUser.user.role;
            data.formData.parentId = this.props.activeUser.user.userId;
            data.formData.businessName = this.props.activeUser.user.companyName;
            data.formData.region = 'NA';

            const newUser = data.formData;
            this.props.signupRequest(newUser);
        }
    }

    render() {
        const {message} = this.props.activeUser; 
         const {error} = this.props.activeUser;
        return (
            <div>
            <TopBar { ...this.props} />
            <Sidebar.Pushable as={Segment}>
                <MobileMenu  {...this.props}/>
                <Sidebar.Pusher>
                    <Segment basic>
                    <Container className='pageWrap'>
                        <Header as='h1'>
                          ADD TEAM MEMBER
                        </Header>
   
                        <Form onSubmit={this.handleSubmit}>
                            <Table >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell collapsing>
                                            <Icon name='user' /> Email
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Input  name='email' placeholder='Email' />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing>
                                            <Icon name='lock' /> Password
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Input type='password' name='password' placeholder='Password' />
                                            
                                        </Table.Cell>
                                    </Table.Row>
                                        <Table.Row>
                                        <Table.Cell collapsing>
                                            <Icon name='user' /> User Role
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Select className={classnames({'error': error.role})}   name='childRole' options={role} placeholder={error.role && error.role||'User Role'}   />
                                            
                                        </Table.Cell>
                                    </Table.Row>
                                    
                                </Table.Body>
                            </Table>
                            <div className='formWrap'>
                                <Button  type='submit' floated='right'>Add Team Member</Button>
                            </div>
                        </Form>                                           
                                                                                                                             
                    </Container>

                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        signupRequest: bindActionCreators(signupRequest ,dispatch),
        userResetFetch: bindActionCreators(userResetFetch ,dispatch)
    }    
}


export default connect(null, mapDispatchToProps)(ChildUserSignup);