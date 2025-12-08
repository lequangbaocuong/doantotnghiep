import { Router } from 'express';
import { suspectController } from '../controllers/suspect.controller';
import { uploadWanted } from '../middleware/upload.middleware';

const router = Router();

router.post('/add', uploadWanted, suspectController.addSuspect);
router.get('/by-case/:id_vuan', suspectController.getSuspectsByCase);
router.get('/:id', suspectController.getDetail);

export default router;