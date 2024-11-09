const router = require('express').Router();
const ScoreController = require('../controllers/scoreController');
const auth = require('../middlewares/validation/authValidation');

router.post('/', auth, ScoreController.saveScore);
router.get('/leaderboard', ScoreController.getTopScores);
router.get('/me', auth, ScoreController.getUserScores);

module.exports = router; 