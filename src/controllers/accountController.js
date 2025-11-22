const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

exports.createAccount = async (req, res) => {
  try {
    const { name, type, currency, balance } = req.body;
    const acc = await Account.create({ userId: req.user.id, name, type, currency, balance });
    res.status(201).json({ account: acc });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.json({ accounts });
  } catch (err) { res.status(500).json({ message: err.message }); }
};


exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.user.id });
    if(!account) return res.status(404).json({ message: 'Account not found' });
    const transactions = await Transaction.find({ accountId: account._id }).limit(50).sort({ date: -1 });
    res.json({ account, transactions });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteAccount = async (req, res) => {
  try {
    const acc = await Account.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if(!acc) return res.status(404).json({ message: 'Account not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
