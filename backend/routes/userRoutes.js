const express = require('express');
const router = express.Router();
const { getMyProfile, logInUser , getUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
const { authorizeUser } = require('../middleware/authMiddleware');

router.route('/').get(getUsers).post(addUser);
router.route('/login').post(logInUser);
router.route('/myprofile').get(authorizeUser, getMyProfile);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;