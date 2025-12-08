import { Router } from 'express';
import { truynaController } from '../controllers/wanted.controller';
import { uploadWanted } from '../middleware/upload.middleware';

const router = Router();

router.post('/create', uploadWanted, truynaController.create);
router.get('/pending', truynaController.getPending);
router.put('/update-status/:id', truynaController.updateStatus);

export default router;