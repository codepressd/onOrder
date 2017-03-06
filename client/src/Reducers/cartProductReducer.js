/* eslint-disable */
import { GET_PRODUCTS_SUCCESS,
		 REMOVE_PRODUCT, 
		 GET_ALL_PRODUCTS, 
		 GET_SINGLE_PRODUCT_SUCCESS,
		 GET_SINGLE_PRODUCT_FAIL, 
		 UPDATE_PRODUCT_SUCCESS,
		 UPDATE_PRODUCT_FAIL,
		 UPDATE_CART, 
		 RESET_FETCH, 
		 ORDERS_TO_STORE, 
		 SINGLE_ORDER_TO_STORE,
		 ADD_PRODUCT_SUCCESS,
		 ADD_PRODUCT_FAIL} from '../Actions/productActions';

const initialState ={
	message:'',
	Products: [],
	isFetching: true
}

const ProductReducer = (state=initialState, action) => {


	switch(action.type){

		case GET_PRODUCTS_SUCCESS:
			return{
				...state,
				Products: action.Products,
				isFetching: false
			}

		case ADD_PRODUCT_SUCCESS:
			return{
				...state,
				message: action.message
			}

		case ADD_PRODUCT_FAIL:
			return{
				...state,
				message: action.message
			}

		case UPDATE_PRODUCT_SUCCESS:
			return{
				...state,
				message: action.message
			}
		case UPDATE_PRODUCT_FAIL:
			return{
				...state,
				message: action.message
			}

		case REMOVE_PRODUCT:

			return{
				...state,
				Products: [
					...state.Products.slice(0,action.index),
					...state.Products.slice(action.index +1)

				]
			}

		case GET_ALL_PRODUCTS:
			return{
				...state,
				Products: action.products,
				isFetching: false
			}

		case GET_SINGLE_PRODUCT_SUCCESS:
			return{
				...state,
				Products: action.product,
				isFetching: false
			}

		case GET_SINGLE_PRODUCT_FAIL:
			return{
				...state,
				message: action.message,
				isFetching: false
			}

		case RESET_FETCH:
			return{
				...state,
				isFetching: true
			}

		case ORDERS_TO_STORE:
			return{
				...state,
				Orders: action.orders,
				isFetching: false
			}

		case SINGLE_ORDER_TO_STORE:
			return{
				...state,
				Order: action.order,
				isFetching: false
			}



		default:
			return state;
	}
}
export default ProductReducer;