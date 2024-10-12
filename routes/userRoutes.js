import { Router } from "express";
import {
   register,
   login,
   uploadAssignment,
   getAllAdmins,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload", authMiddleware, uploadAssignment);
router.get("/admins", authMiddleware, getAllAdmins);

export default router;
