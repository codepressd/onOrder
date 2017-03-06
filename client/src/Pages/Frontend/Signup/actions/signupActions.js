import axios from 'axios';

export function signupRequest(data){
	
	return dispatch =>{

		return axios.post('api/signup', data);
	}
}