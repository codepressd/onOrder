/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Sidebar, Segment, Header, Card, Button, Divider, Icon } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

//import action get
import {getSupplierProducts, resetFetch, searchProducts} from '../../../Actions/productActions';//update state with products

//import user Actions
import {checkUserToken, userResetFetch} from '../../../Actions/userActions';//update state with products

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//import Top Bar
import TopBar from '../components/TopBar';
 
//import product
import SingleProduct from'../components/Supplier/SingleProduct';
import  '../backend.css';

class SupplierProducts extends React.Component{
	constructor(props){
		super(props);
		
	}


	componentWillMount() {
		const {user} = this.props;
		const{token} = this.props.activeUser;
		const userId = {
			userId : user.userId
		}

		const userInfo = {
			token,
			userId: user.userId
		}
		this.props.checkUserToken(userInfo);

		if(user.isChild){
			const supplierId ={
				userId: user.parent
			}
			this.props.getSupplierProducts(supplierId);
		}else{
			this.props.getSupplierProducts(userId);

		}
		
		
	}

	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();
	}

	render(){
		const {user} = this.props;
		const {Products, message, isFetching} = this.props.products;
		let imageUrl =  '/walrus-hat-noimage.jpg';

		const {success, userIsFetching} = this.props.activeUser;
		

		if(userIsFetching || !success || isFetching){
          return(
          <Loader active inline='centered' />
          )
		}else if(!userIsFetching || success){
			
			return(
			<div>

			<TopBar {...this.props} />
			<Sidebar.Pushable as={Segment}>
			        <MobileMenu  {...this.props}/>
			        <Sidebar.Pusher>
                  			<Segment basic>
				<div className='pageWrap'>
					<Container>
					
					<Header as='h1' >
						PRODUCTS
					</Header> 
					<div className='message'>{ message }</div>
					
						<Card.Group  >
						
							{Products.map((product, index) => <SingleProduct key={index} index={index} product={product} /> )}

						</Card.Group>
						<div className='add'>
							<Icon  link onClick={() => browserHistory.push('/backend/supplier/add-products')} name='add circle' size='huge' />
						</div>
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
	return {
		user: state.ActiveUser.user,
		products: state.Products
	}

}

function mapDispatchToProps(dispatch){
	return{
		getSupplierProducts: bindActionCreators(getSupplierProducts, dispatch),
		searchProducts: bindActionCreators(searchProducts, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch)
	}
}

export default connect(
   mapStateToProps,
  mapDispatchToProps
)(SupplierProducts);