import { Router } from 'express';
import { resultController } from '../controllers/result.controller';

const router = Router();

router.post('/create', resultController.createReport);
router.get('/pending', resultController.getPendingReports);
router.put('/approve/:id', resultController.approveReport);
router.get('/case/:id_vuan', resultController.getReportByCase);

export default router;