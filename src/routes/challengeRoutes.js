import express from "express";

import {
  getModuleChallenges,
  getChallengeDetails,
  submitFlag,
  getUserChallenges
} from "../controllers/challengeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* List challenges of a module */
router.get("/modules/:id/challenges", getModuleChallenges);

/* Get challenge details */
router.get("/challenges/:id", getChallengeDetails);

/* Submit flag */
router.post("/challenges/:id/submit", verifyToken, submitFlag);

/* Get solved challenges for logged user */
router.get("/user/challenges", verifyToken, getUserChallenges);

export default router;