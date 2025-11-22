const router = require('express').Router();
const auth = require('../middleware/auth');
const { createTransaction, listTransactions, getTransaction, deleteTransaction } = require('../controllers/transactionController');

router.use(auth);
router.post('/', createTransaction);
router.get('/', listTransactions);
router.get('/:id', getTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
