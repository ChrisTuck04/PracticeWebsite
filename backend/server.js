import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.js';

dotenv.config({ quiet: true });

connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use('/api/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});