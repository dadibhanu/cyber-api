import { cyber_pool } from "../db/db.js";

export const getModuleChallenges = async (req, res) => {

  try {

    const moduleId = req.params.id;

    const [rows] = await cyber_pool.query(
      `SELECT id,title,description,difficulty,xp_reward,challenge_type
       FROM cyber_challenges
       WHERE module_id=?`,
      [moduleId]
    );

    res.json({
      success:true,
      challenges:rows
    });

  } catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server error"
    });

  }
}

  export const getChallengeDetails = async (req, res) => {

  try {

    const challengeId = req.params.id;

    const [rows] = await cyber_pool.query(
      `SELECT *
       FROM cyber_challenges
       WHERE id=?`,
      [challengeId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      });
    }

    res.json(rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}

  export const getUserChallenges = async (req, res) => {

  try {

    const userId = req.user.id;

    const [rows] = await cyber_pool.query(
      `SELECT challenge_id, solved, solved_at
       FROM cyber_user_challenges
       WHERE user_id=?`,
      [userId]
    );

    res.json({
      success: true,
      challenges: rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

export const submitFlag = async (req, res) => {

  try {

    const challengeId = req.params.id;
    const { flag } = req.body;
    const userId = req.user.id; // from JWT middleware

    /* Get flag from DB */
    const [rows] = await cyber_pool.query(
      "SELECT flag FROM cyber_flags WHERE challenge_id=?",
      [challengeId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flag not found"
      });
    }

    /* Check flag */
    if (rows[0].flag !== flag) {
      return res.json({
        success: false,
        message: "Incorrect flag"
      });
    }

    /* Check if already solved */
    const [existing] = await cyber_pool.query(
      `SELECT * FROM cyber_user_challenges
       WHERE user_id=? AND challenge_id=?`,
      [userId, challengeId]
    );

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "Challenge already solved"
      });
    }

    /* Mark challenge solved */
    await cyber_pool.query(
      `INSERT INTO cyber_user_challenges
       (user_id,challenge_id,solved,solved_at)
       VALUES (?, ?, true, NOW())`,
      [userId, challengeId]
    );

    /* Get XP reward */
    const [challenge] = await cyber_pool.query(
      `SELECT xp_reward FROM cyber_challenges WHERE id=?`,
      [challengeId]
    );

    const xp = challenge[0].xp_reward;

    /* Add XP to user */
    await cyber_pool.query(
      `UPDATE cyber_profiles
       SET xp = xp + ?
       WHERE user_id=?`,
      [xp, userId]
    );

    res.json({
      success: true,
      message: "Correct flag!",
      xp_awarded: xp
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
