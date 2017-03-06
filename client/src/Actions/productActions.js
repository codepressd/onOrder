/* eslint-disable */
import axios from 'axios';
import {browserHistory} from 'react-router';

//Product Actions
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_CATEGORY = 'GET_PRODUCT_CATEGORY';

export const GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS';
export const GET_SINGLE_PRODUCT_FAIL = 'GET_SINGLE_PRODUCT_FAIL';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';

export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';


//Cart Actions
export const UPDATE_CART= 'UPDATE_CART';
export const RESET_CART= 'RESET_CART';
export const REMOVE_PRODUCT_FROM_CART= 'REMOVE_PRODUCT_FROM_CART';

//getting orders
export const ORDERS_TO_STORE= 'ORDERS_TO_STORE';
export const SINGLE_ORDER_TO_STORE= 'SINGLE_ORDER_TO_STORE';

//resets fetching for double render
export const RESET_FETCH= 'RESET_FETCH';

export const getProductCategory = (data) => dispatch => {

	return axios.post('/api/getProductCategory', data)
		.then((res) => {
			const {products} = res.data;
			dispatch(getAllProducts(products));
		})
		.catch((err)=> console.log(err));

}



//Add Product to Database

export const addProduct = (data) => dispatch => {
	
	return axios.post('/api/postProduct', data)
	.then((res) => {
		const {message} = res.data;
		dispatch(addProductSuccess(message));
		browserHistory.push('/backend/supplier/products');
	})
	.catch((err) => {
		dispatch(addProductFail(message));
		browserHistory.push('/backend/supplier/products');
	});
}

export const addProductSuccess = (message) =>{
	
	return{
		type: ADD_PRODUCT_SUCCESS,
		message
	}
}

export const addProductFail = (message) =>{
	return{
		type: ADD_PRODUCT_FAIL,
		message
	}
}

//Update Product

export const updateProduct = (data) => dispatch => {
	
	return axios.post('/api/updateProduct', data)
	.then((res) => {
		const {message} = res.data;
		dispatch(updateProductSuccess(message));
		browserHistory.push('/backend/supplier/products');
	})
	.catch((err) => {
		console.log(err);
		dispatch(updateProductFail('There was a problem updating this product...'));
		browserHistory.push('/backend/supplier/products');
	})
}

export const updateProductSuccess = (message) => {
	
	return{	
		type: UPDATE_PRODUCT_SUCCESS,
		message
	}
}

export const updateProductFail = (message) => {
	return{	
		type: UPDATE_PRODUCT_FAIL,
		message
	}
}

//

/*Get Supplier Products*/

export const getSupplierProducts = (data) => dispatch =>{

	return axios.post('/api/getSupplierProducts', data)
	.then((res) => {
		const{products} = res.data;
		dispatch(getProductsSuccess(products));
	})
	.catch((err) => {
		console.log(err);
	});

}

export const getProductsSuccess = (Products) => {
	return{
		type: GET_PRODUCTS_SUCCESS,
		Products
	}
}

// Get Single Product

export const getSingleProduct = (data) => dispatch => {
	
	return axios.get('/api/getSingleProduct/'+data)
	.then((res) => {
		const {product}= res.data;
		dispatch(getSingleProductSuccess(product));
	})
	.catch((err) => {
		dispatch(getSingleProductFail('Could Not Access This Product'));
	})
}

export const getSingleProductFail = (message) => {
	
	return{	
		type: GET_SINGLE_PRODUCT_FAIL,
		message
	}
}

export const getSingleProductSuccess = (product) => {
	
	return{	
		type: GET_SINGLE_PRODUCT_SUCCESS,
		product
	}
}


//Delete Products
export const deleteProduct = (data, index) => dispatch =>{
	
	return axios.delete('/api/removeProduct/'+data)
	.then(res =>{
		dispatch(removeProduct(index));
	})
	.catch((err) => {
		console.log(err);
	});
}


export const removeProduct = (index) => {
	return{
		type: REMOVE_PRODUCT,
		index
	}
}

//Search Products

export const searchProducts = (data, id, view) => dispatch => {
	data.id = id;
	data.view = view;
	axios.post('/api/searchProducts', data)
	.then((res) => {
		const products = res.data;
		dispatch(getProductsSuccess(products));
	})
	.catch((err) =>{
		console.log(err);
	})
}


export const getAllProducts = (products) => {

	return{	
		type: GET_ALL_PRODUCTS,
		products
	}
}



export const resetFetch = () => {
	
	return{	
		type: RESET_FETCH,
	}
}

export const addToCart = (product) => {
	
	return{	
		type: UPDATE_CART,
		product
	}
}

export const removeProductFromCart= (index) => {
	
	return{	
		type: REMOVE_PRODUCT_FROM_CART,
		index
	}
}
export const resetCart= () => {
	
	return{	
		type: RESET_CART,
	}
}

export const addOrdersToStore= (orders) => {
	
	return{	
		type: ORDERS_TO_STORE,
		orders
	}
}

export const singleOrderToStore= (order) => {
	
	return{	
		type: SINGLE_ORDER_TO_STORE,
		order
	}
}


