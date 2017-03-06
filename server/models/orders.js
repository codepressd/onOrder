import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    orderTotal: {},
    orderDate:{type: String},
    userOrdered: {type: String},
    orderNumber: {type: String},
    location:{
    	name: {type: String},
    	address: {type: String},
    	city: {type: String},
    	state: {type: String},
    	areacode: {type: String}
    },
    products: [{}],
    suppliers:[]
});

module.exports = mongoose.model('Order', OrderSchema)