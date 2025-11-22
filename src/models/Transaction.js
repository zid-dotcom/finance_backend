const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true, required: true },
  accountId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  type: { type: String, enum: ['debit','credit'], required: true },
  category: { type: String, default: 'uncategorized' },
  description: String,
  date: { type: Date, default: Date.now, index: true },
  metadata: { type: Object }
});

TransactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
