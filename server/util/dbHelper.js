const fs = require('fs');
const convertExcel = require('excel-as-json').processFile;
const path = require('path');

import Product from '../models/product';


const fileDirectory = './server/util/productbooks/breakthru';
const breakthruImage = '/breakthru.png';
exports.loopFiles = function(){
	fs.readdir(fileDirectory, function(err, files) {
		if(err){
			console.log('err firing', err);
		}else {
			files.map((file, index) => {
				//filename is category
				let productCategory = file.substr(0, file.lastIndexOf('.')).toLowerCase();

				convertExcel(__dirname+'/productbooks/breakthru/'+file, undefined, false, (err, data) => {
					if(err){
						console.log('err in convert', err);
					}else{
						
						data.map((product, index) =>{
							console.log(productCategory, product);
							let newProduct = new Product({
								title: product['Item Description'],
								description: product['Size'],
								price:{
									single: '0',
									case: product['List Price']
								},
								category: productCategory,
								image: breakthruImage,
								supplierId: '' ,
								supplier: 'Breakthru Beverage',
								supplieritemId: product['Item #']

							 });

						});
						
					}

				});

			});
			
		}
	});
};