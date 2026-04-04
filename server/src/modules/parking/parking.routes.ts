import { Router } from 'express';
import { ParkingController } from './parking.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createSlotSchema, updateSlotSchema, allocateSlotSchema, createFloorSchema } from './parking.dto';
import { Role } from '../../core/types/enums';

const router = Router();
const controller = new ParkingController();

router.use(authenticate);

router.get('/slots', controller.getAllSlots);
router.get('/slots/available', controller.getAvailableSlots);
router.get('/slots/:id', controller.getSlotById);
router.post('/slots', authorize(Role.ADMIN), validate(createSlotSchema), controller.createSlot);
router.put('/slots/:id', authorize(Role.ADMIN), validate(updateSlotSchema), controller.updateSlot);
router.delete('/slots/:id', authorize(Role.ADMIN), controller.deleteSlot);
router.post('/slots/allocate', validate(allocateSlotSchema), controller.allocateSlot);

router.get('/floors', controller.getAllFloors);
router.post('/floors', authorize(Role.ADMIN), validate(createFloorSchema), controller.createFloor);

export default router;
