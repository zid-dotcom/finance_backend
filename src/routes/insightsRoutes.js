const router = require('express').Router();
const auth = require('../middleware/auth');
const { monthlyCategory, summary } = require('../controllers/insightsController');

router.use(auth);
router.get('/monthly-category', monthlyCategory);
router.get('/summary', summary);

module.exports = router;
