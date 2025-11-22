const router = require('express').Router();
const auth = require('../middleware/auth');
const { createAccount, listAccounts, getAccount, deleteAccount } = require('../controllers/accountController');

router.use(auth);
router.post('/', createAccount);
router.get('/', listAccounts);
router.get('/:id', getAccount);
router.delete('/:id', deleteAccount);

module.exports = router;
