import { Router } from 'express';
import { countActiveSevenDaysSession, countActiveTodaySessions, countUsers } from '../controller/analytics';

const router = Router();
router.get('/count-users', countUsers);
router.get('/today-sessions', countActiveTodaySessions);
router.get('/week-sessions', countActiveSevenDaysSession);

export default router;