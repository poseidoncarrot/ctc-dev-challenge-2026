import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError } from '@/lib/errors';

/**
 * GET /api/stats/spending/by-restaurant
 * Returns spending breakdown by restaurant.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        r.id as restaurant_id,
        r.name as restaurant_name,
        r.cuisine,
        COUNT(v.id) as visit_count,
        COALESCE(SUM(v."amountSpent"), 0) as total_spent,
        COALESCE(AVG(v."amountSpent"), 0) as average_spent
      FROM restaurants r
      LEFT JOIN visits v ON r.id = v."restaurantId"
      GROUP BY r.id, r.name, r.cuisine
      ORDER BY total_spent DESC
    `);

    return NextResponse.json(rows);
  } catch (err) {
    return handleError(err);
  }
}
