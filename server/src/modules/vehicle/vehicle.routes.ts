import { Router } from 'express';
import { VehicleController } from './vehicle.controller';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { createVehicleSchema, updateVehicleSchema } from './vehicle.dto';

const router = Router();
const controller = new VehicleController();

router.use(authenticate);

router.get('/', controller.getUserVehicles);
router.post('/', validate(createVehicleSchema), controller.createVehicle);
router.get('/:id', controller.getVehicleById);
router.put('/:id', validate(updateVehicleSchema), controller.updateVehicle);
router.delete('/:id', controller.deleteVehicle);

export default router;
