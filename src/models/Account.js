const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['checking','savings','credit','wallet','investment'], default: 'checking' },
  currency: { type: String, default: 'USD' },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', AccountSchema);
