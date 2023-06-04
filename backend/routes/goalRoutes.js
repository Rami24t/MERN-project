const express = require('express');
const router = express.Router();
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { authorizeUser } = require('../middleware/authMiddleware');

router.route('/').get(authorizeUser, getGoals).post(authorizeUser, addGoal);
router.route('/:id').put(authorizeUser, updateGoal).delete(authorizeUser, deleteGoal);

module.exports = router;