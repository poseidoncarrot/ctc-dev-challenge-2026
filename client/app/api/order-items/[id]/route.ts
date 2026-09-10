import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError, NotFoundError } from '@/lib/errors';
import { toOrderItem } from '@/lib/types';
import { parsePositiveIntId, validateOrderItemInput } from '@/lib/validation';

type Params = { params: { id: string } };

/**
 * PUT /api/order-items/:id
 * Update an existing order item.
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Order item not found');
    }

    const body = await req.json();
    const input = validateOrderItemInput(body);

    const { rows } = await pool.query(
      `UPDATE order_items
       SET item_name = $1, price = $2, quantity = $3
       WHERE id = $4
       RETURNING *`,
      [input.itemName, input.price, input.quantity, id]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Order item not found');
    }

    return NextResponse.json(toOrderItem(rows[0]));
  } catch (err) {
    return handleError(err);
  }
}

/**
 * DELETE /api/order-items/:id
 * Delete an order item.
 */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = parsePositiveIntId(params.id);
    if (id === null) {
      throw new NotFoundError('Order item not found');
    }

    const { rowCount } = await pool.query(
      'DELETE FROM order_items WHERE id = $1',
      [id]
    );

    if (!rowCount || rowCount === 0) {
      throw new NotFoundError('Order item not found');
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}
