// backend/routes/case.route.ts
import { Router } from 'express';
import { caseController } from '../controllers/case.controller';

const router = Router();

router.get('/', caseController.getAllCases);
router.post('/create', caseController.createCase);

export default router;