import express from 'express';
import { uploadEvidence } from '../middleware/upload.middleware';
import { reportController } from '../controllers/report.controller';

const router = express.Router();

router.post(
    '/api/submit-report', 
    uploadEvidence, 
    reportController.submitReport
);

export default router;