import { BadRequestError } from './errors';

export interface ValidatedRestaurantInput {
  name: string;
  cuisine: string | null;
  address: string | null;
  rating: number | null;
}

/**
 * Validates whether a string is a valid positive integer id (e.g. 1, 2, 42).
 * Rejects floats ('1.5'), negatives ('-1'), non-numeric strings ('abc'),
 * scientific notation ('1e2'), and out-of-range integers.
 * Returns the parsed integer if valid, or null if invalid.
 */
export function parsePositiveIntId(id: string): number | null {
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    return null;
  }

  const num = Number(id);
  if (!Number.isSafeInteger(num) || num <= 0 || num > 2147483647) {
    return null;
  }

  return num;
}

/**
 * Validates request body for restaurant creation (POST) and update (PUT).
 * Throws BadRequestError if validation fails.
 */
export function validateRestaurantInput(body: unknown): ValidatedRestaurantInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new BadRequestError('Request body must be a JSON object');
  }

  const record = body as Record<string, unknown>;

  // Validate 'name'
  if (typeof record.name !== 'string' || record.name.trim().length === 0) {
    throw new BadRequestError('Restaurant "name" is required and cannot be empty');
  }

  // Validate 'rating' (optional, 0 to 5)
  let rating: number | null = null;
  if (record.rating !== undefined && record.rating !== null) {
    if (
      typeof record.rating !== 'number' ||
      Number.isNaN(record.rating) ||
      record.rating < 0 ||
      record.rating > 5
    ) {
      throw new BadRequestError('Restaurant "rating" must be a number between 0 and 5');
    }
    rating = record.rating;
  }

  // Validate 'cuisine' (optional, string or null)
  let cuisine: string | null = null;
  if (record.cuisine !== undefined && record.cuisine !== null) {
    if (typeof record.cuisine !== 'string') {
      throw new BadRequestError('Restaurant "cuisine" must be a string');
    }
    cuisine = record.cuisine.trim();
  }

  // Validate 'address' (optional, string or null)
  let address: string | null = null;
  if (record.address !== undefined && record.address !== null) {
    if (typeof record.address !== 'string') {
      throw new BadRequestError('Restaurant "address" must be a string');
    }
    address = record.address.trim();
  }

  return {
    name: record.name.trim(),
    cuisine,
    address,
    rating,
  };
}
