import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

// Route đăng nhập
router.post("/login", AuthController.login);
router.post("/canbo/login", AuthController.loginCanBo);
router.post("/change-password", verifyToken, AuthController.changePassword);
router.post("/change-password-first-time", verifyToken, AuthController.changePasswordFirstTime);
// lấy thông tin người dùng
router.get("/profile", verifyToken, AuthController.getProfile);
router.put("/profile", verifyToken, AuthController.updateProfile);
export default router;