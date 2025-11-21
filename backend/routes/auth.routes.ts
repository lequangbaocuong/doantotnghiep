import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();

// Route đăng nhập
router.post("/login", AuthController.login);
router.post("/change-password", verifyToken, AuthController.changePassword);
router.post("/change-password-first-time", verifyToken, AuthController.changePasswordFirstTime);
export default router;