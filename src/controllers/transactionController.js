const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

exports.createTransaction = async (req, res) => {
  try {
    const { accountId, amount, type, category, description, date } = req.body;
    if(!accountId || !amount || !type) return res.status(400).json({ message: 'Missing fields' });

    const account = await Account.findOne({ _id: accountId, userId: req.user.id });
    if(!account) return res.status(400).json({ message: 'Invalid account' });

    const tx = await Transaction.create({
      userId: req.user.id,
      accountId,
      amount,
      type,
      category,
      description,
      date: date || Date.now()
    });

    // Update account balance simply
    account.balance = (type === 'credit') ? account.balance + amount : account.balance - amount;
    await account.save();

    res.status(201).json({ transaction: tx });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 25, from, to, category } = req.query;
    const q = { userId: req.user.id };
    if(from || to) q.date = {};
    if(from) q.date.$gte = new Date(from);
    if(to) q.date.$lte = new Date(to);
    if(category) q.category = category;

    const txs = await Transaction.find(q).sort({ date: -1 }).skip((page-1)*limit).limit(parseInt(limit));
    const total = await Transaction.countDocuments(q);
    res.json({ data: txs, meta: { page: parseInt(page), limit: parseInt(limit), total } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOne({ _id: req.params.id, userId: req.user.id });
    if(!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ transaction: tx });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if(!tx) return res.status(404).json({ message: 'Transaction not found' });
    // Optionally adjust account balance
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
