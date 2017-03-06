import Cart from '../models/cart';
import User from '../models/users';
import Order from '../models/orders';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

exports.addToCart = function(req, res, next){

    const addedProduct = req.body;
   
    Cart.findOneAndUpdate({
        usersId: addedProduct.userId
    },{ $push: {products: addedProduct}}, {new: true}, function(err, product){
        if(err){
            return next(err);
        }
        res.status(201).json(product.products);
    })

}
exports.removeFromCart= function(req, res, next){

    const removedProductInfo = req.body;
   
	    Cart.update({
	        usersId: removedProductInfo.userId
	    },{ $pull: { 'products': {productId :  removedProductInfo.productId } }}, {new: true}, function(err, data){
	        if(err){
	            return next(err);
	        }
	        res.status(201).json(data);
	    })
}

// Send orders to database

exports.sendOrders= function(req, res, next){

   	 const usersOrder= req.body;
   	 const{orderNumber, orderTotal, orderDate, userId, products, suppliers} = req.body;
   	 

   	 Order.findOne({orderNumber : orderNumber}, function(err, existingOrder){
   	 	if(err){
   	 		return next(err);
   	 	}
   	 	if(existingOrder){
   	 		return res.status(422).send({ order: 'That order already exists.' });
   	 	}
   	 	let order = new Order({
	   	 	usersId: userId,
	   	 	orderTotal : orderTotal,
	   	 	orderNumber: orderNumber,
	   	 	orderDate: orderDate,
	   	 	products: products,
	   	 	suppliers: suppliers

   		 });
   	 	
   	 	order.save(function(err, order){
   	 		if(err){
   	 			return next(err);
   	 		}

   	 	});
   	 }).exec()
   	 .then(function(orders){
   	  	Cart.findOneAndUpdate({
	        		usersId: usersOrder.userId
	   	 },{ $set: { products: []}}, {new: true}).exec()
   	  	.then(function(cart){
   	  		res.status(201).json({message: 'Order added successfully and Cart Removed'});
   	  	})
   	  })


}

//restaurant Orders

exports.getRestOrders= function(req, res, next){

   	 const restId= req.params.restId;
   

   	Order.find({
   		usersId : restId
   	},function(err, orders){
		if (err){
			return next(err);
		}

		res.status(201).json({orders: orders});
	});

}

exports.getSingleOrder= function(req, res, next){

   	 const orderId = req.params.restId;
   	

   	Order.findOne({ orderNumber: orderId},function(err, order){
		if (err){

			return next(err);
		}
		res.status(201).json(order);
	});

}

//Suppliers orders

exports.getSupplierOrders= function(req, res, next){

   	 const {supplierId}= req.params;
   	

   	Order.find({
   		suppliers : { $in: [supplierId] }
   	},function(err, orders){
		if (err){
			return next(err);
		}
		
		res.status(201).json({orders: orders});
	});

}