// const Transaction = require('../models/Transaction');
// const mongoose = require('mongoose');

// // Monthly totals by category
// exports.monthlyCategory = async (req, res) => {
//   try {
//     const userId = mongoose.Types.ObjectId(req.user.id);
//     const { year, month } = req.query; // optional
//     let start, end;
//     if(year && month){
//       start = new Date(parseInt(year), parseInt(month)-1, 1);
//       end = new Date(parseInt(year), parseInt(month), 1);
//     } else {
//       const now = new Date();
//       start = new Date(now.getFullYear(), now.getMonth(), 1);
//       end = new Date(now.getFullYear(), now.getMonth()+1, 1);
//     }

//     const agg = await Transaction.aggregate([
//       { $match: { userId: userId, date: { $gte: start, $lt: end } } },
//       { $group: { _id: '$category', total: { $sum: '$amount' } } },
//       { $sort: { total: -1 } }
//     ]);

//     res.json({ data: agg });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// // Summary: income vs expense for period
// exports.summary = async (req, res) => {
//   try {
//     const userId = mongoose.Types.ObjectId(req.user.id);
//     const { from, to } = req.query;
//     const start = from ? new Date(from) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
//     const end = to ? new Date(to) : new Date();

//     const agg = await Transaction.aggregate([
//       { $match: { userId: userId, date: { $gte: start, $lte: end } } },
//       { $group: { _id: '$type', total: { $sum: '$amount' } } }
//     ]);

//     const result = { income: 0, expense: 0 };
//     agg.forEach(r => { if(r._id === 'credit') result.income = r.total; else if(r._id === 'debit') result.expense = r.total; });

//     res.json({ summary: result });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };



const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Monthly totals by category
exports.monthlyCategory = async (req, res) => {
  try {
    // FIX: must use new ObjectId()
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const { year, month } = req.query;
    let start, end;

    if (year && month) {
      start = new Date(parseInt(year), parseInt(month) - 1, 1);
      end = new Date(parseInt(year), parseInt(month), 1);
    } else {
      const now = new Date();
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    const agg = await Transaction.aggregate([
      { $match: { userId: userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    res.json({ data: agg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Summary: income vs expense for period
exports.summary = async (req, res) => {
  try {
    // FIX: must use new ObjectId()
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const { from, to } = req.query;
    const start = from ? new Date(from) :
      new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = to ? new Date(to) : new Date();

    const agg = await Transaction.aggregate([
      { $match: { userId: userId, date: { $gte: start, $lte: end } } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    const result = { income: 0, expense: 0 };
    agg.forEach(r => {
      if (r._id === 'credit') result.income = r.total;
      else if (r._id === 'debit') result.expense = r.total;
    });

    res.json({ summary: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
