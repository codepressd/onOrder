/* eslint-disable */
export const calculateCartTotal = (cart) => {
		
		const taxRate = 1.07725;
		//get subtotal
		let subTotal = 0;
			cart.map((product) => {
					subTotal += Number(product.price) * Number(product.quantity);
			})

		let total = subTotal * taxRate;
		let tax = total - subTotal;
		//fix to two decimals
		const finalSubTotal = subTotal.toFixed(2);
		const finalTax = tax.toFixed(2);
		const finalTotal = total.toFixed(2);

		return {
			subTotal: finalSubTotal,
			total: finalTotal,
			tax: finalTax
		}
}

const randomNumber = () => {
	let text = '';
   	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for( var i = 0 ; i < 10; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}	
    	return text;
}

const getDate = () =>{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	return today = mm+'/'+dd+'/'+yyyy;
}

export const sortCart = (cart, user) => {

	let itemsOrdered = cart.length;
	
	let orderDate = getDate();
	let cartTotal = calculateCartTotal(cart);
	const orderNumber = 'Salut-'+randomNumber();//create order number

	const uniqueSupplierIDs = [...new Set(cart.map(item => item.product.supplierId))];
	let productsArray =  cart.map((item) => {
		return{
			 title: item.product.title,
			 productId: item.product._id,
			 quantity: item.quantity,
			 price: item.price,
			 size: item.type,
			 description: item.product.description,
			 supplierId: item.product.supplierId,
			 supplierName: item.product.supplier
			}

	});
	

	const finalOrder = {
		orderNumber: orderNumber,
		orderTotal: cartTotal,
		orderDate: orderDate,
		userId: user,
		products: productsArray,
		suppliers: uniqueSupplierIDs
	};

	
	return finalOrder;
}

export const suppliersProducts = (order, supplierId) => {
		
		 let products = order.products .filter((product) => {
				return product.supplierId === supplierId;
			});

		 let cartTotal = calculateCartTotal(products);
		 let supplierOrder={
		 	totalPrice: cartTotal,
		 	products: products
		 };
		return supplierOrder;
}

export const productTotal = (products) => {
		let totalPrice = null;
		products.forEach((product) =>{
			let productPrice = product.price * product.quantity;
			totalPrice += productPrice;

		});
		return totalPrice
	}
