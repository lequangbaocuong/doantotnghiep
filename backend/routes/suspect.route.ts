import { Router } from 'express';
import { suspectController } from '../controllers/suspect.controller';
import { uploadSingleCloud } from '../middleware/upload.middleware';

const router = Router();

router.post('/add', uploadSingleCloud, suspectController.addSuspect);
router.get('/by-case/:id_vuan', suspectController.getSuspectsByCase);
router.get('/:id', suspectController.getDetail);
router.put('/update/:id', uploadSingleCloud,suspectController.updateSuspect);

export default router;