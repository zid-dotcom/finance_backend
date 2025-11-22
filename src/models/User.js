const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  settings: {
    currency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
