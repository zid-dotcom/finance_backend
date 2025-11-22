const router = require('express').Router();
const auth = require('../middleware/auth');
const { createBudget, listBudgets, getBudgetProgress } = require('../controllers/budgetController');

router.use(auth);
router.post('/', createBudget);
router.get('/', listBudgets);
router.get('/:id/progress', getBudgetProgress);

module.exports = router;
