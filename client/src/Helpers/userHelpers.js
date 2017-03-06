import {browserHistory} from 'react-router';

export const getUserRole = (props) =>{
    const state = props.store.getState();
    if(!state.ActiveUser.user){
          return null;
    }
    return state.ActiveUser.user.role;
  }

export const userLoggedRedirect = (userView) => {

	if(userView === 'restaurant' || userView ==='supplier'){
		browserHistory.push('/backend/dashboard');
	}
	
}

export const supplierAuth = (userRole, props) => {

    if(userRole !== 'supplier' || userRole.length === 0 || userRole === null){
      props.store.dispatch({type: 'NOT_AUTHORIZED', message: 'Not Authorized For This Content', success: false});
      browserHistory.push('/login');
    }
  }


export const restaurantAuth = (userRole, props) => {
    
    if(userRole !== 'restaurant' || userRole.length === 0 || userRole === null){
      props.store.dispatch({type: 'NOT_AUTHORIZED', message: 'Not Authorized For This Content', success: false});
      browserHistory.push('/login');
    }
  }