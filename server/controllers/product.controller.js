import Product from '../models/product';
import serverConfig from '../config/database';
import mongoose from 'mongoose';


function setProductInfo(req){
	return{
		_id: req._id,
		title: req.title,
		description: req.description,
		singlePrice: req.price.single,
		casePrice: req.price.case,
		category: req.category,
		imageurl: req.image,
		supplier: req.supplier,
		supplier: req.supplierId
	}
}


exports.postProduct = function(req, res, next){

	const {supplierId, supplier, productName, unitPrice, casePrice, productDescription, productType, image, numInCases, quantity} = req.body;
	if(!productName){
		return res.status(422).send({ productName: 'You must enter a Product Name.' });
	}
	if(!casePrice){
		return res.status(422).send({ casePrice: 'You must enter an Case Price.' });
	}
	if(!productType){
		return res.status(422).send({ productType: 'You must enter a Product Type.' });	
	}

	let product = new Product ({
		title: productName,
		description: productDescription,
		price: {
			unit: unitPrice,
			case: casePrice
		},
		quantity: quantity,
		unitsPerCase: numInCases,
		category: productType,
		image: image,
		supplierId: supplierId,
		supplier: supplier,
		supplierItemId: ''
	});
		

	product.save(function(err, user){
		if(err){
			return next(err);
		}

		let productInfo = setProductInfo(user);
		res.status(201).json({
			product: productInfo,
			message: 'Product Added Successfully'
		})
	})
}

exports.getSupplierProducts = function(req, res, next){

	const supplyId = req.body.userId;

	Product.find({supplierId :  supplyId}, function(err, products){
		if (err){
			return next(err);
		}

		res.status(201).json({products: products});

	});	
}

exports.getSingleProduct = function(req, res, next){
	
	Product.findOne({
		_id: req.params.productId
	}, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({product: product});
	})


}

exports.searchProducts = function(req, res, next){
	
	const {search, id, view} = req.body;

	Product.find(
		{$text : {$search: search}},
		{score: {$meta:"textScore"}}, function(err, products){

			if(err){
				return next(err);
			}
			
			if(view === 'supplier'){
				console.log('this fired');
				let filteredProducts = products.filter((product)=>{
					return product.supplierId === id;
				});
				res.status(201).json(filteredProducts); 
			}else{
				res.status(201).json(products);
			}
		}
		);
	
}

exports.updateProduct = function(req, res, next){

	const {supplierId, quantity, numInCases, productId, supplier, productName, unitPrice, casePrice, productDescription, productType, image} = req.body;
	
	const updatedProduct = {
		title: productName,
		description: productDescription,
		price: {
			unit: unitPrice,
			case: casePrice
		},
		quantity: quantity,
		unitsPerCase: numInCases,
		category: productType,
		image: image,
		supplierId: supplierId,
		supplier: supplier,
		supplierItemId: ''

	};

	Product.findOneAndUpdate({
		_id: productId 
	},{ $set: updatedProduct}, {new: true}, function(err, product){
		if(err){
			return next(err);
		}
		res.status(201).json({message:'Product Successfully Updated!'});
	})
}

exports.removeProduct = function(req, res, next){
	Product.remove({

		_id: req.params.product_id

	}, function(err, product){
		if(err){
			return next(err);
		}
		res.status(201).json({message: 'Product Successfully Deleted!'});
	})
}

//For Restaurant side

exports.getProducts = function(req, res, next){

	Product.find({}, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({products: product});
	})
}

exports.getProductCategory = function(req, res, next){
	let query={
		category: req.body.category
	};
	
	if(req.body.category === 'all products'){
		query = {}
		
	}
	
	Product.find(query, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({products: product});
	})
}


