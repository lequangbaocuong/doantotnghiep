import { Router } from 'express';
import { truynaController } from '../controllers/truyna.controller';
import { uploadWanted } from '../middleware/upload.middleware';

const router = Router();

// POST: /api/truyna/create
router.post('/create', uploadWanted, truynaController.create);

export default router;