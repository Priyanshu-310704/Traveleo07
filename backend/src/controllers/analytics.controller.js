import pool from "../config/db.js";

/* ================= ANALYTICS DASHBOARD ================= */
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    /* 1️⃣ CATEGORY-WISE SPENDING */
    const categoryQuery = `
      SELECT 
        c.name AS category,
        SUM(e.amount)::float AS total
      FROM expenses e
      JOIN categories c ON e.category_id = c.id
      WHERE e.user_id = $1
      GROUP BY c.name
      ORDER BY total DESC
    `;

    /* 2️⃣ MONTHLY SPENDING TREND */
    const monthlyQuery = `
      SELECT 
        TO_CHAR(e.expense_date, 'Mon YYYY') AS month,
        SUM(e.amount)::float AS total
      FROM expenses e
      WHERE e.user_id = $1
      GROUP BY month
      ORDER BY MIN(e.expense_date)
    `;

    /* 3️⃣ HIGHEST SPENDING TRIP */
    const highestTripQuery = `
      SELECT 
        t.id,
        t.title,
        SUM(e.amount)::float AS total_spent
      FROM trips t
      JOIN expenses e ON e.trip_id = t.id
      WHERE t.user_id = $1
      GROUP BY t.id, t.title
      ORDER BY total_spent DESC
      LIMIT 1
    `;

    /* 4️⃣ AVERAGE DAILY SPEND */
    const avgDailyQuery = `
      SELECT 
        ROUND(AVG(daily_total), 2)::float AS avg_daily_spend
      FROM (
        SELECT 
          expense_date,
          SUM(amount) AS daily_total
        FROM expenses
        WHERE user_id = $1
        GROUP BY expense_date
      ) sub
    `;

    /* 5️⃣ BUDGET OVERRUN WARNINGS */
    const budgetOverrunQuery = `
      SELECT
        t.id,
        t.title,
        b.total_budget,
        SUM(e.amount)::float AS spent,
        (SUM(e.amount) - b.total_budget)::float AS overrun
      FROM budgets b
      JOIN trips t ON b.trip_id = t.id
      JOIN expenses e ON e.trip_id = t.id
      WHERE t.user_id = $1
      GROUP BY t.id, t.title, b.total_budget
      HAVING SUM(e.amount) > b.total_budget
      ORDER BY overrun DESC
    `;

    const [
      categoryRes,
      monthlyRes,
      highestTripRes,
      avgDailyRes,
      overrunRes,
    ] = await Promise.all([
      pool.query(categoryQuery, [userId]),
      pool.query(monthlyQuery, [userId]),
      pool.query(highestTripQuery, [userId]),
      pool.query(avgDailyQuery, [userId]),
      pool.query(budgetOverrunQuery, [userId]),
    ]);

    res.json({
      success: true,
      analytics: {
        categoryWise: categoryRes.rows,
        monthlyTrend: monthlyRes.rows,
        highestSpendingTrip: highestTripRes.rows[0] || null,
        averageDailySpend: avgDailyRes.rows[0]?.avg_daily_spend || 0,
        budgetOverruns: overrunRes.rows,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load analytics",
    });
  }
};
