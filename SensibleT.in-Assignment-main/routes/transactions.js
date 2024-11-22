// API routes for transactions
import express from 'express';
import Transaction from '../models/Transaction.js';
import { getNextSequence } from '../utils/getNextSequence.js';

const router = express.Router();


// 1. POST /api/transactions/ - Create a new transaction with sequential transaction_id
router.post('/', async (req, res) => {
    const { amount, transaction_type, user } = req.body;

    // try {
    //     const newTransaction = new Transaction({
    //       transaction_id: Math.floor(Math.random() * 1000000), // Generate a unique transaction_id
    //       amount,
    //       transaction_type,
    //       user,
    //     });
  
    
    try {
      const transaction_id = await getNextSequence('transaction_id'); // Get the next sequence number
      const newTransaction = new Transaction({
        transaction_id: transaction_id,
        amount: amount,
        transaction_type: transaction_type,
        user: user,
      });
  
      await newTransaction.save();
      return res.status(201).json(newTransaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

// 2. GET /api/transactions/ - Retrieve all transactions for a specific user
router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    const transactions = await Transaction.find({ user: user_id });
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. PUT /api/transactions/:transaction_id/ - Update the status of an existing transaction
router.put('/:transaction_id', async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  if (!['COMPLETED', 'FAILED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transaction_id: transaction_id },
      { status },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/transactions/:transaction_id/ - Retrieve the details of a specific transaction
router.get('/:transaction_id', async (req, res) => {
  const { transaction_id } = req.params;

  try {
    const transaction = await Transaction.findOne({ transaction_id: transaction_id });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

