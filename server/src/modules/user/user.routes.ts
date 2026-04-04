import { Router } from 'express';
import { UserController } from './user.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { updateUserSchema, updateRoleSchema } from './user.dto';
import { Role } from '../../core/types/enums';

const router = Router();
const controller = new UserController();

router.use(authenticate);

router.get('/me', controller.getProfile);
router.put('/me', validate(updateUserSchema), controller.updateProfile);

router.get('/', authorize(Role.ADMIN), controller.getAllUsers);
router.get('/:id', authorize(Role.ADMIN), controller.getUserById);
router.put('/:id/role', authorize(Role.ADMIN), validate(updateRoleSchema), controller.updateRole);
router.delete('/:id', authorize(Role.ADMIN), controller.deactivateUser);

export default router;
