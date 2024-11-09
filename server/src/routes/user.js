const router = require('express').Router();
const UserController = require('../controllers/userController');
const auth = require('../middlewares/validation/authValidation');

router.get('/me', auth, UserController.getProfile);
router.put('/profile', auth, UserController.updateProfile);

module.exports = router;