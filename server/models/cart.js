import mongoose from 'mongoose';

const CartSchema = mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    products: [{}]
});

module.exports = mongoose.model('Cart', CartSchema)