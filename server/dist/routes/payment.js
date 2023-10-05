import { Router } from 'express';
import { home, validPayment } from '../controllers/payment';
const router = Router();
router.get('/', home);
router.post('/validate', validPayment);
export default router;
