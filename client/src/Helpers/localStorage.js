export const loadUserState = () => {
	try{
		const userState = localStorage.getItem('user');
		if(userState === null){
			return undefined;
		}
		return JSON.parse(userState)
	}catch (err){
		return undefined;
	}
}

export const saveUserState = (state) => {
	try{
		const userState = JSON.stringify(state);
		localStorage.setItem('user', userState);
	}catch (err){
		return undefined;

	}
}
