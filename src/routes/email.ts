import { Router } from 'express';
import { getUserAuth, sendVerificationEmail } from '../controller/email';

const router = Router();
router.get('/:uid', getUserAuth);
router.post('/send-verification', sendVerificationEmail);

export default router;