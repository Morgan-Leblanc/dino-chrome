import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import auth from '../middlewares/validation/authValidation.js';

const router = Router();

router.get('/me', auth, getProfile);

export default router;