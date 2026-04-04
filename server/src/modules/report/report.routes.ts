import { Router } from 'express';
import { ReportController } from './report.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { Role } from '../../core/types/enums';

const router = Router();
const controller = new ReportController();

router.use(authenticate);

router.get('/dashboard', controller.getDashboardStats);
router.get('/occupancy', authorize(Role.ADMIN), controller.getOccupancy);
router.get('/revenue', authorize(Role.ADMIN), controller.getRevenue);
router.get('/popular-slots', authorize(Role.ADMIN), controller.getPopularSlots);
router.get('/peak-hours', authorize(Role.ADMIN), controller.getPeakHours);

export default router;
