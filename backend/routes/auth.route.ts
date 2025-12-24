import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

router.post("/login", AuthController.login);
router.post("/canbo/login", AuthController.loginCanBo);
router.post("/change-password", verifyToken, AuthController.changePassword);
router.post("/change-password-first-time", verifyToken, AuthController.changePasswordFirstTime);
router.post("/forgot-password", AuthController.forgotPassword )
router.post("/reset-password", AuthController.resetPassword);
router.get("/profile", verifyToken, AuthController.getProfile);
router.put("/profile", verifyToken, AuthController.updateProfile);
export default router;