import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        unit: { type: Number },
        case: { type: Number }
    },
    quantity: {type: Number},
    unitsPerCase: {type: Number},
    category: { type: String },
    image: {type: String },
    supplierId:{type:String},
    supplier: { type: String },
    supplierItemId: {type:String}
});
ProductSchema.index(
            {
                title: "text",
                description: "text",
            },
            {
                weights:{
                    title: 2,
                    description: 1,
                },
                name:"TextIndex"
            }
        );

module.exports = mongoose.model('Product', ProductSchema)