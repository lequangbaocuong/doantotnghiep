import { Router } from 'express';
import { evidenceController } from '../controllers/evidence.controller';
import { uploadSingleEvidence } from '../middleware/upload.middleware'; // Middleware upload ảnh/file

const router = Router();

router.post('/submit', uploadSingleEvidence, evidenceController.submitEvidence);
export default router;