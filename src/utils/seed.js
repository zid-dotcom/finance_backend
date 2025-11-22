/**
 * Simple seeding script to create a demo user, account and transactions.
 * Usage: npm run seed
 */
const mongoose = require('mongoose');
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const bcrypt = require('bcrypt');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/raynott';

async function run(){
  await mongoose.connect(MONGO);
  console.log('Connected to DB for seeding');

  await User.deleteMany({});
  await Account.deleteMany({});
  await Transaction.deleteMany({});
  await Budget.deleteMany({});

  const hash = await bcrypt.hash('Password123!', 12);
  const user = await User.create({ firstName: 'Demo', lastName: 'User', email: 'demo@raynott.com', passwordHash: hash });

  const acc1 = await Account.create({ userId: user._id, name: 'Checking Account', type: 'checking', balance: 2500 });
  const acc2 = await Account.create({ userId: user._id, name: 'Savings Account', type: 'savings', balance: 8000 });

  await Transaction.create({ userId: user._id, accountId: acc1._id, amount: 1200, type: 'credit', category: 'Salary', description: 'Monthly salary' });
  await Transaction.create({ userId: user._id, accountId: acc1._id, amount: 45.5, type: 'debit', category: 'Groceries', description: 'Walmart' });
  await Transaction.create({ userId: user._id, accountId: acc2._id, amount: 200, type: 'credit', category: 'Interest', description: 'Savings interest' });

  await Budget.create({ userId: user._id, name: 'Groceries', category: 'Groceries', amount: 400, period: 'monthly' });

  console.log('Seeding complete. Demo user: demo@raynott.com / Password123!');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
