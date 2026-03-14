import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getCyberProfile } from "../controllers/cyberProfileController.js";

const router = express.Router();

router.get("/profile", verifyToken, getCyberProfile);

export default router;