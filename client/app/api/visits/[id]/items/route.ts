import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError, NotFoundError } from '@/lib/errors';
import { toOrderItem } from '@/lib/types';
import { parsePositiveIntId, validateOrderItemInput } from '@/lib/validation';

type Params = { params: { id: string } };

/**
 * GET /api/visits/:id/items
 * Returns all order items for a specific visit.
 */
export async function GET(_req: Request, { params }: Params) {
  try {
    const visitId = parsePositiveIntId(params.id);
    if (visitId === null) {
      throw new NotFoundError('Visit not found');
    }

    // Check if visit exists first
    const visitCheck = await pool.query(
      'SELECT id FROM visits WHERE id = $1',
      [visitId]
    );

    if (visitCheck.rows.length === 0) {
      throw new NotFoundError('Visit not found');
    }

    const { rows } = await pool.query(
      'SELECT * FROM order_items WHERE "visitId" = $1 ORDER BY id',
      [visitId]
    );

    return NextResponse.json(rows.map(toOrderItem));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * POST /api/visits/:id/items
 * Add an order item to a specific visit.
 */
export async function POST(req: Request, { params }: Params) {
  try {
    const visitId = parsePositiveIntId(params.id);
    if (visitId === null) {
      throw new NotFoundError('Visit not found');
    }

    // Check if visit exists first
    const visitCheck = await pool.query(
      'SELECT id FROM visits WHERE id = $1',
      [visitId]
    );

    if (visitCheck.rows.length === 0) {
      throw new NotFoundError('Visit not found');
    }

    const body = await req.json();
    const input = validateOrderItemInput(body);

    const { rows } = await pool.query(
      `INSERT INTO order_items ("visitId", item_name, price, quantity)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [visitId, input.itemName, input.price, input.quantity]
    );

    return NextResponse.json(toOrderItem(rows[0]), { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}
