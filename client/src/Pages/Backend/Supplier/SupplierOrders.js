/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button, Loader, Sidebar, Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';

// import SideMenu from '../components/SupplierMenu';
import  '../backend.css';

//import TopBar
import TopBar from '../components/TopBar.js';

// //actions to get orders and update state
// import {getSupplierOrders } from '../actions/getSupplierOrders'; //call to database
// import {addOrdersToStore} from '../../../components/actions/productActions';//update store with orders

//import user Actions
import {checkUserToken, userResetFetch} from '../../../Actions/userActions';//Check user is verified

//Reset Fetching State
import {resetFetch} from '../../../Actions/productActions';//reset fetching

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

// //Import the One Product
// import SupplierOneOrder from '../components/supplierOneOrder';


class Orders extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		const {user} = this.props;
	                  const{token} = this.props.activeUser;
	                  const userInfo = {
	             		token,
	              		userId: user.id
	           	 }
	            	this.props.checkUserToken(userInfo);
	  		

		// this.props.getSupplierOrders(user.id)
		// .then((res) =>{
			
		// 	this.props.addOrdersToStore(res.data.orders);
		// })
		// .catch();
	}

	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();
	}

	render(){

		const {user, orders} = this.props;
		const {success, userIsFetching} = this.props.activeUser;
		//const isLoading = this.props.isFetching;

		if(userIsFetching || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){
		
			return(
			<div>
			<TopBar {...this.props} />
			<Sidebar.Pushable as={Segment}>
			        <MobileMenu  {...this.props}/>
			        <Sidebar.Pusher>
                  			<Segment basic>
				<div className='pageWrap'>
					<Container>
					<h2>{user.companyName} : Orders</h2>
						<Table celled padded>
						      <Table.Header>
						        <Table.Row>
						          <Table.HeaderCell >Order Number</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'># of Items</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Total</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Order Details</Table.HeaderCell>
						        </Table.Row>
						      </Table.Header>

						      <Table.Body>
						     {/*orders.map((order, index) => <SupplierOneOrder key={index} index={index} order={order} /> )*/}
						      </Table.Body>
						    </Table>
					</Container>
				</div>
				</Segment>
        			      </Sidebar.Pusher>
			</Sidebar.Pushable>
			</div>
			)}else{
		                        browserHistory.push('/login');
		                  }
	}

}
function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		orders: state.Products.Orders,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		// getSupplierOrders: bindActionCreators(getSupplierOrders, dispatch),
		// addOrdersToStore: bindActionCreators(addOrdersToStore, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
    		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Orders);