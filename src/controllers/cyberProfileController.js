import { cyber_pool } from "../db/db.js";

export const getCyberProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    console.log("User ID from token:", userId);

    const [rows] = await cyber_pool.query(
      `SELECT id,user_id,username,xp,level,streak,last_login,created_at
       FROM cyber_profiles
       WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      profile: rows[0]
    });

  } catch (error) {

    console.error("Cyber profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};