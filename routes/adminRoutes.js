import { Router } from "express";
import {
   getAssignments,
   acceptAssignment,
   rejectAssignment,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/assignments", authMiddleware, getAssignments);
router.post("/assignments/:id/accept", authMiddleware, acceptAssignment);
router.post("/assignments/:id/reject", authMiddleware, rejectAssignment);

export default router;
