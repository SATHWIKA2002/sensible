// Main entry point
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactions.js';

const app = express();

// Middleware
app.use(express.json());  // Express built-in body parser
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/api/transactions', transactionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


