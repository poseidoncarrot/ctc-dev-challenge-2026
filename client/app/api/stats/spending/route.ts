import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError } from '@/lib/errors';

/**
 * GET /api/stats/spending
 * Returns overall spending statistics.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_visits,
        COALESCE(SUM("amountSpent"), 0) as total_spent,
        COALESCE(AVG("amountSpent"), 0) as average_per_visit,
        COALESCE(MIN("amountSpent"), 0) as min_spent,
        COALESCE(MAX("amountSpent"), 0) as max_spent
      FROM visits
    `);

    return NextResponse.json(rows[0]);
  } catch (err) {
    return handleError(err);
  }
}
