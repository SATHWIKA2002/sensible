// Mongoose schema for transactions
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, unique: true, required: true },
  amount: { type: Number, required: true },
  transaction_type: { type: String, enum: ['DEPOSIT', 'WITHDRAWAL'], required: true },
  user: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);

