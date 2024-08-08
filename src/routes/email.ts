import { Router } from 'express';
import { sendVerificationEmail } from '../controller/email';

const router = Router();
router.post('/send-verification',sendVerificationEmail);

export default router;