const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.createBudget = async (req, res) => {
  try {
    const { name, category, amount, period, startDate, endDate } = req.body;
    const b = await Budget.create({ userId: req.user.id, name, category, amount, period, startDate, endDate });
    res.status(201).json({ budget: b });
  } catch (err) { res.status(500).json({ message: err.message }); }
};



exports.listBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ budgets });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// exports.getBudgetProgress = async (req, res) => {
//   try {
//     const budgetId = req.params.id;
//     const budget = await Budget.findOne({ _id: budgetId, userId: req.user.id });
//     if(!budget) return res.status(404).json({ message: 'Budget not found' });

//     // compute spent amount for budget's category during period
//     const start = budget.startDate || new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1);
//     const end = budget.endDate || new Date();

//     const spentAgg = await Transaction.aggregate([
//       { $match: { userId: mongoose.Types.ObjectId(req.user.id), category: budget.category, date: { $gte: start, $lte: end } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const spent = (spentAgg[0] && spentAgg[0].total) || 0;
//     res.json({ budget: budget, spent, remaining: Math.max(0, budget.amount - spent) });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };




// Replace your existing getBudgetProgress with this
exports.getBudgetProgress = async (req, res) => {
  try {
    const budgetId = req.params.id;
    // ensure we treat IDs as ObjectId
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const budgetObjectId = new mongoose.Types.ObjectId(budgetId);

    const budget = await Budget.findOne({ _id: budgetObjectId, userId: userObjectId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    // compute period (start/end)
    const start = budget.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = budget.endDate || new Date();

    const spentAgg = await Transaction.aggregate([
      { 
        $match: { 
          userId: userObjectId,
          category: budget.category,
          date: { $gte: start, $lte: end }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const spent = (spentAgg[0] && spentAgg[0].total) || 0;
    res.json({ budget, spent, remaining: Math.max(0, budget.amount - spent) });
  } catch (err) {
    console.error('getBudgetProgress error:', err);
    res.status(500).json({ message: err.message });
  }
};
