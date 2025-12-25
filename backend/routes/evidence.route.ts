import { Router } from 'express';
import { evidenceController } from '../controllers/evidence.controller';
import { uploadCloud } from "../middleware/upload.middleware";

const router = Router();

router.post('/submit', uploadCloud, evidenceController.submitEvidence);
export default router;