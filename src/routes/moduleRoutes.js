import express from "express";
import { getModules,getModuleContent  } from "../controllers/moduleController.js";

const router = express.Router();

router.get("/modules", getModules);
router.get("/modules/:id/content", getModuleContent);

export default router;