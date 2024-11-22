// Controller logic
import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.query;
    const transactions = await Transaction.find({ user: user_id });
    res.json({ transactions });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
