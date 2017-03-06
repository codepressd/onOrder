import axios from 'axios';

export function loginRequest(data){
	
	return dispatch =>{

		return axios.post('api/login', data);
	}
}