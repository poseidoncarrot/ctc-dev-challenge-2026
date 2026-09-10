import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError } from '@/lib/errors';
import { toVisit } from '@/lib/types';
import { validateVisitInput } from '@/lib/validation';

/**
 * GET /api/visits
 * Returns all visits, optionally filtered by date range.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = 'SELECT * FROM visits';
    const params: any[] = [];
    const conditions: string[] = [];

    if (startDate) {
      conditions.push('date >= $' + (params.length + 1));
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('date <= $' + (params.length + 1));
      params.push(endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY date DESC';

    const { rows } = await pool.query(query, params);
    return NextResponse.json(rows.map(toVisit));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * POST /api/visits
 * Create a new visit.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = validateVisitInput(body);

    const { rows } = await pool.query(
      `INSERT INTO visits ("restaurantId", date, "amountSpent", notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [input.restaurantId, input.date, input.amountSpent, input.notes]
    );

    return NextResponse.json(toVisit(rows[0]), { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}
