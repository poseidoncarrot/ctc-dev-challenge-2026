import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError, NotFoundError } from '@/lib/errors';
import { toRestaurant } from '@/lib/types';
import { parsePositiveIntId, validateRestaurantInput } from '@/lib/validation';

type Params = { params: { id: string } };

/**
 * GET /api/restaurants/:id
 * Returns a single restaurant, or 404 if it doesn't exist or if :id is not a positive integer.
 */
export async function GET(_req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Restaurant not found');
    }

    const { rows } = await pool.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Restaurant not found');
    }

    return NextResponse.json(toRestaurant(rows[0]));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * PUT /api/restaurants/:id
 * Update an existing restaurant.
 *
 * Validates :id and request body, updates the row, and returns the updated
 * record (or 404 if it doesn't exist).
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Restaurant not found');
    }

    const body = await req.json();
    const input = validateRestaurantInput(body);

    const { rows } = await pool.query(
      `UPDATE restaurants
       SET name = $1, cuisine = $2, address = $3, rating = $4
       WHERE id = $5
       RETURNING *`,
      [input.name, input.cuisine, input.address, input.rating, id]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Restaurant not found');
    }

    return NextResponse.json(toRestaurant(rows[0]));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * DELETE /api/restaurants/:id
 * Delete a restaurant.
 *
 * Deletes the row matching :id and returns 204 (or 404 if it doesn't exist).
 * Associated visits are cascade-deleted by foreign key constraint.
 */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Restaurant not found');
    }

    const { rowCount } = await pool.query(
      'DELETE FROM restaurants WHERE id = $1',
      [id]
    );

    if (!rowCount || rowCount === 0) {
      throw new NotFoundError('Restaurant not found');
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}

