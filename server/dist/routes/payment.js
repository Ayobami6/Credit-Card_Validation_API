import { Router } from 'express';
import { home } from '../controllers/payment';
const router = Router();
router.get('/', home);
export default router;
