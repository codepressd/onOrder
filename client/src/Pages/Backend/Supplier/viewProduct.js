/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Divider, Form, Button, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import{bindActionCreators} from 'redux';
import classnames from 'classnames';


//Reset Fetching State
import {resetFetch, getSingleProduct} from '../../../Actions/productActions';//reset fetching

//import user Actions
import {checkUserToken, userResetFetch} from '../../../Actions/userActions';//update user state


//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//Import Top Bar
import TopBar from '../components/TopBar';

import  '../backend.css';


class ViewProduct extends React.Component{

	constructor(props){
		super(props);

		this.state={
			errors: {}
		}
	}

	componentWillMount() {
		const {productId} = this.props.params;
		const userId = this.props.activeUser.user.userId;
		const{ token } = this.props.activeUser;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);


	    this.props.getSingleProduct(productId)
	    
	}

	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();
	}
	

	render(){
		const {user} = this.props;
		const isLoading = this.props.isFetching;
		const { product } = this.props;
		const { errors } = this.state;
		const {success, userIsFetching} = this.props.activeUser;
		let productImage = '/walrus-hat-noimage.jpg';

		//if  product has Image
		if(product.image !== ''){
			productImage = product.image;
		}

		if(isLoading || !success){
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
					<Grid columns='equal' stackable>
						<Grid.Row>
							<Grid.Column>
							<Image size='large' src={productImage} centered/>
							</Grid.Column>
							<Grid.Column>
							<h2>{product.title}</h2>
							<Divider />
							<h4>{product.description}</h4>
							<h4>Single: ${product.price.unit}</h4>
							<h4>Case: ${product.price.case}</h4>
							<h4>Quantity: {product.quantity}</h4>
							<h4>Units Per Case: {product.unitsPerCase}</h4>
							<h4>Category: {product.category}</h4>

							<Divider />
							<div className='formWrap'>
								<Button  onClick={() => browserHistory.push('/backend/supplier/update-products/'+product._id)} floated='right'>Edit Product</Button>
							</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
			</Segment>
		        </Sidebar.Pusher>
		</Sidebar.Pushable>
		</div>

		)
		}else{
			browserHistory.push('/login');
		}
	}

}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		product: state.Products.Products,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		getSingleProduct: bindActionCreators(getSingleProduct, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewProduct);