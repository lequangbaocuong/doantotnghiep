import { Router } from 'express';
import { truynaController } from '../controllers/wanted.controller';
import { uploadWanted } from '../middleware/upload.middleware';

const router = Router();

router.post('/create', uploadWanted, truynaController.create);
router.get('/pending', truynaController.getPending);
router.put('/update-status/:id', truynaController.updateStatus);

router.get('/approved', truynaController.getApproved);
router.get('/all', truynaController.getAllWanted); 
router.delete('/:id', truynaController.deleteWanted); 
export default router;