import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

// Route đăng nhập
router.post("/login", AuthController.login);

export default router;