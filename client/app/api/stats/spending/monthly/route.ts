import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError } from '@/lib/errors';

/**
 * GET /api/stats/spending/monthly
 * Returns monthly spending breakdown.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        TO_CHAR(date, 'YYYY-MM') as month,
        COUNT(*) as visit_count,
        COALESCE(SUM("amountSpent"), 0) as total_spent,
        COALESCE(AVG("amountSpent"), 0) as average_spent
      FROM visits
      GROUP BY TO_CHAR(date, 'YYYY-MM')
      ORDER BY month DESC
    `);

    return NextResponse.json(rows);
  } catch (err) {
    return handleError(err);
  }
}
