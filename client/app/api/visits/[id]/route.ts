import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError, NotFoundError } from '@/lib/errors';
import { toVisit } from '@/lib/types';
import { parsePositiveIntId, validateVisitInput } from '@/lib/validation';

type Params = { params: { id: string } };

/**
 * GET /api/visits/:id
 * Returns a single visit with its order items, or 404 if it doesn't exist.
 */
export async function GET(_req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Visit not found');
    }

    const { rows } = await pool.query(
      'SELECT * FROM visits WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Visit not found');
    }

    return NextResponse.json(toVisit(rows[0]));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * PUT /api/visits/:id
 * Update an existing visit.
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Visit not found');
    }

    const body = await req.json();
    const input = validateVisitInput(body);

    const { rows } = await pool.query(
      `UPDATE visits
       SET "restaurantId" = $1, date = $2, "amountSpent" = $3, notes = $4
       WHERE id = $5
       RETURNING *`,
      [input.restaurantId, input.date, input.amountSpent, input.notes, id]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Visit not found');
    }

    return NextResponse.json(toVisit(rows[0]));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * DELETE /api/visits/:id
 * Delete a visit.
 */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Visit not found');
    }

    const { rowCount } = await pool.query(
      'DELETE FROM visits WHERE id = $1',
      [id]
    );

    if (!rowCount || rowCount === 0) {
      throw new NotFoundError('Visit not found');
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}
