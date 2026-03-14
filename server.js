import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cyberRoutes from "./src/routes/cyberRoutes.js";
import moduleRoutes from "./src/routes/moduleRoutes.js";
import challengeRoutes from "./src/routes/challengeRoutes.js";
import leaderboardRoutes from "./src/routes/leaderboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cyberRoutes);
app.use("/api", moduleRoutes);
app.use("/api", challengeRoutes);
app.use("/api", leaderboardRoutes);



app.get("/", (req, res) => {
  res.send("Cyber API Running");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});