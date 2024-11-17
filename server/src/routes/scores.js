import { Router } from 'express';
import { saveScore, getTopThreeScores } from '../controllers/scoreController.js';
import auth from '../middlewares/validation/authValidation.js';

const router = Router();

router.post('/savescore', auth, saveScore);
router.get('/topscore/:userId', auth, getTopThreeScores);

export default router; 