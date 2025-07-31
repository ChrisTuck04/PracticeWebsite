import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;