import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';

const router = Router();

router.get('/users', adminController.getAllUsers);
router.post('/users/create', adminController.createAccount);
router.delete('/users/:type/:id', adminController.deleteUser); 
router.get('/roles', adminController.getRoles);
router.post('/create-citizen', adminController.createCitizenAccount);
router.put('/users/nguoidan/:id', adminController.updateCitizenAccount);
router.put('/users/canbo/:id', adminController.updateOfficerAccount)
export default router;