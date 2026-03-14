import { cyber_pool } from "../db/db.js";

export const getLeaderboard = async (req, res) => {

  try {

    const limit = req.query.limit || 10;

    const [rows] = await cyber_pool.query(
      `SELECT username, xp, level
       FROM cyber_profiles
       ORDER BY xp DESC
       LIMIT ?`,
      [Number(limit)]
    );

    res.json({
      success: true,
      leaderboard: rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};