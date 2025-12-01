import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { uploadEvidence } from '../middleware/upload.middleware';

const router = Router();

router.post('/submit-report', uploadEvidence, reportController.submitReport);
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', reportController.getReportDetail);
export default router;