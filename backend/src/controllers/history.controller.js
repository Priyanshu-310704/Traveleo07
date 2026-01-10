import pool from "../config/db.js";

/* ================= GLOBAL EXPENSE HISTORY ================= */
export const getExpenseHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      trip,
      category,
      minAmount,
      maxAmount,
      startDate,
      endDate,
    } = req.query;

    let conditions = [`e.user_id = $1`];
    let values = [userId];
    let idx = 2;

    if (trip) {
      conditions.push(`e.trip_id = $${idx++}`);
      values.push(trip);
    }

    if (category) {
      conditions.push(`c.id = $${idx++}`);
      values.push(category);
    }

    if (minAmount) {
      conditions.push(`e.amount >= $${idx++}`);
      values.push(minAmount);
    }

    if (maxAmount) {
      conditions.push(`e.amount <= $${idx++}`);
      values.push(maxAmount);
    }

    if (startDate) {
      conditions.push(`e.expense_date >= $${idx++}`);
      values.push(startDate);
    }

    if (endDate) {
      conditions.push(`e.expense_date <= $${idx++}`);
      values.push(endDate);
    }

    const query = `
      SELECT
        e.id,
        e.amount,
        e.description,
        e.expense_date,
        e.created_at,
        t.title AS trip_title,
        t.destination,
        c.name AS category
      FROM expenses e
      JOIN trips t ON e.trip_id = t.id
      JOIN categories c ON e.category_id = c.id
      WHERE ${conditions.join(" AND ")}
      ORDER BY e.expense_date DESC
    `;

    const result = await pool.query(query, values);

    res.json({
      success: true,
      expenses: result.rows,
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load expense history",
    });
  }
};
