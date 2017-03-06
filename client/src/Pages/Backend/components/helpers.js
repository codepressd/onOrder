
export const getPageTitle = (location) => {

	let pageTitle = location.substr(location.lastIndexOf('/') +1).toUpperCase();
	const finalTitle = pageTitle.replace(/-/g, " ");
	return finalTitle;
}