import { Router } from 'express';
import { assignmentController } from '../controllers/assignment.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.get('/plans/:id_vuan', assignmentController.getPlansByCase);
router.post('/plan', assignmentController.createPlan);

router.get('/tasks/:id_kehoach', assignmentController.getTasksByPlan);
router.post('/task', assignmentController.createTask);
router.get('/my-tasks', verifyToken, assignmentController.getMyTasks);

export default router;