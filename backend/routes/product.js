import express from 'express';
import Product from '../models/Products.js';
import { authenticateToken } from './utility.js';

const router = express.Router();

router.post('/create-product', authenticateToken, async (req, res) => {
    const { name, price, image } = req.body;
    
    const newProduct = new Product({
        name: name,
        price: price,
        image: image
    });

    try {
        await newProduct.save();
        return res.status(201).json({ message: 'Product saved successfully', product: newProduct });
    } catch (error) {
        console.error('Error saving product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/update-product', authenticateToken, async (req, res) => {
    const { name, price, image, productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try{
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name;
        product.price = price;
        product.image = image;
        await product.save();
        return res.status(200).json({ message: 'Product updated successfully', product });

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/delete-product', authenticateToken, async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try{
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//! INCOMPLETE
router.post('/read-product', authenticateToken, async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try{
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;