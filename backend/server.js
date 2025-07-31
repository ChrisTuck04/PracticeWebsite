import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.js';

dotenv.config({ quiet: true });
const app = express();

app.use(express.json());

app.post('/api/create-product', async (req, res) => {
    const {name, price, image} = req.body;
    
    const newProduct = new Product({
        name: name,
        price: price,
        image: image
    });

    try{
        await newProduct.save();
        return res.status(201).json({ message: 'Product saved successfully', product: newProduct });
    }
    catch (error) {
        console.error('Error saving product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(5050, () => {
    connectDB();
    console.log('Server is running on port http://localhost:5050');
});
