/* eslint-disable */
//import Auth Actions
import {
	AUTHORIZE_USER,
	AUTHORIZE_CHILD, 
	AUTHORIZE_ERROR, 
	AUTHORIZE_USER_UPDATE, 
	USER_LOGIN_FAIL, 
	USER_SIGNUP_FAIL, 
	USER_LOGOUT, 
	GET_TEAM_MEMBERS_FAIL, 
	GET_TEAM_MEMBERS_SUCCESS, 
	TOGGLE_USER_MENU, 
	CHANGE_PASSWORD_ERROR,
	CHILD_USER_INFO_SUCCESS, 
	USER_TOKEN_SUCCESS, 
	USER_RESET_FETCH, 
	NO_TOKEN_FAIL, 
	USER_TOKEN_FAIL, 
	NOT_AUTHORIZED} from '../Actions/userActions';

import {
	UPDATE_CART, 
	REMOVE_PRODUCT_FROM_CART, 
	RESET_CART} from '../Actions/productActions.js';

const initialState = {
	user: null,
	menu: false,
	error: {},
	expiretime: false,
	message:'',
	userIsFetching: true,
	success: false,
	cart: [],
	members:[],
	childInfo:{},
	token: null
}

const AuthUserReducer = (state = initialState, action) => {
	
	switch(action.type){
		case AUTHORIZE_USER:
			return{
				...state,
				user: action.user,
				token: action.token, 
				success: action.success,
				error:{},
				userIsFetching: false
			}

		case AUTHORIZE_CHILD:
			return{
				...state,
				message: action.message,
				userIsFetching: false
			}

		case AUTHORIZE_ERROR:
			return{
				...state,
				error: action.error
			}
		case USER_RESET_FETCH:
			return{
				...state,
				userIsFetching: true,
				success: false,
				menu: false,
				message:''
			}

		case AUTHORIZE_USER_UPDATE:
			return{
				...state,
				user: action.user,
				token: action.token
			}

		case GET_TEAM_MEMBERS_SUCCESS:
			return{
				...state,
				members: action.members
			}

		case GET_TEAM_MEMBERS_FAIL:
			return{
				...state,
				message: action.message
			}

		case CHILD_USER_INFO_SUCCESS:
			return{
				...state,
				childInfo: action.childInfo
			}

		case USER_LOGIN_FAIL:
			return{
				...state,
				error: action.error
			}

		case USER_SIGNUP_FAIL:
			return{
				...state,
				error: action.error
			}

		case USER_LOGOUT:
			return initialState;

		case TOGGLE_USER_MENU:

			return {
				...state, 
				menu: action.toggle
			}


		case USER_TOKEN_SUCCESS:
			return{
				...state,
				expireTime: action.expireTime,
				success: action.success,
				userIsFetching: false
			}

		case USER_TOKEN_FAIL:
			return{
				...state,
				token: action.token,
				message: action.message,
				user: action.user,
				success: action.success,
				userIsFetching: false
			}

		case NO_TOKEN_FAIL:
			return{
				...state,
				success: action.success,
				message: action.message,
				userIsFetching: false
			}

		case NOT_AUTHORIZED:
			return{
				...state,
				success: action.success,
				message: action.message,
				userIsFetching: false
			}


		case CHANGE_PASSWORD_ERROR:
			return{
				...state,
				error: action.error
			}

		case UPDATE_CART:
			
			return{
				...state,
				cart: action.product
					
			}

		case REMOVE_PRODUCT_FROM_CART:
			
			return{
				...state,
				cart: [
					...state.cart.slice(0,action.index),
					...state.cart.slice(action.index +1)

				]
			}

		case RESET_CART:
			
			return{
				...state,
				cart: []
			}

		default:
		return state;
	}
}
export default AuthUserReducer;