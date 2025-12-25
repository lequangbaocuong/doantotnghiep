import { Router } from 'express';
import { caseController } from '../controllers/case.controller';

const router = Router();

router.get('/', caseController.getAllCases);
router.post('/create', caseController.createCase);

router.get('/investigators', caseController.getInvestigators);
router.put('/assign/:id', caseController.assignOfficer);
router.get('/:id', caseController.getCaseDetail);
export default router;