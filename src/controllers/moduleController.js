import { cyber_pool } from "../db/db.js";

export const getModules = async (req, res) => {

  try {

    const { team } = req.query;

    let query = "SELECT * FROM cyber_modules";
    let params = [];

    if (team) {
      query += " WHERE category = ?";
      params.push(team);
    }

    const [rows] = await cyber_pool.query(query, params);

    res.json({
      success: true,
      total: rows.length,
      modules: rows
    });

  } catch (error) {

    console.error("Module fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}
  export const getModuleContent = async (req, res) => {

  try {

    const moduleId = req.params.id;

    const [rows] = await cyber_pool.query(
      "SELECT content FROM cyber_module_content WHERE module_id=?",
      [moduleId]
    );

    if(rows.length === 0){
      return res.status(404).json({
        success:false,
        message:"Module not found"
      });
    }

    res.json(rows[0].content);

  } catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server error"
    });
  }

};