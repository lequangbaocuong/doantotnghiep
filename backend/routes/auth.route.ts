import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();

// Route đăng nhập
router.post("/login", AuthController.login);
router.post("/change-password", verifyToken, AuthController.changePassword);
router.post("/change-password-first-time", verifyToken, AuthController.changePasswordFirstTime);
// lấy thông tin người dùng
router.get("/profile", verifyToken, AuthController.getProfile);
router.put("/profile", verifyToken, AuthController.updateProfile);
export default router;