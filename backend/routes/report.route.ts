import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { uploadCloud } from "../middleware/upload.middleware";

const router = Router();

router.post('/submit-report', uploadCloud, reportController.submitReport);
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', reportController.getReportDetail);
export default router;