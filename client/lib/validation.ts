import { BadRequestError } from './errors';

export interface ValidatedRestaurantInput {
  name: string;
  cuisine: string | null;
  address: string | null;
  rating: number | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_home: number | null;
  price_range: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
}

export interface ValidatedVisitInput {
  restaurantId: number;
  date: string;
  amountSpent: number | null;
  notes: string | null;
}

export interface ValidatedOrderItemInput {
  itemName: string;
  price: number;
  quantity: number;
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

  // Validate 'latitude' (optional, number or null)
  let latitude: number | null = null;
  if (record.latitude !== undefined && record.latitude !== null) {
    if (typeof record.latitude !== 'number' || Number.isNaN(record.latitude)) {
      throw new BadRequestError('Restaurant "latitude" must be a number');
    }
    latitude = record.latitude;
  }

  // Validate 'longitude' (optional, number or null)
  let longitude: number | null = null;
  if (record.longitude !== undefined && record.longitude !== null) {
    if (typeof record.longitude !== 'number' || Number.isNaN(record.longitude)) {
      throw new BadRequestError('Restaurant "longitude" must be a number');
    }
    longitude = record.longitude;
  }

  // Validate 'distance_from_home' (optional, number or null)
  let distance_from_home: number | null = null;
  if (record.distance_from_home !== undefined && record.distance_from_home !== null) {
    if (typeof record.distance_from_home !== 'number' || Number.isNaN(record.distance_from_home) || record.distance_from_home < 0) {
      throw new BadRequestError('Restaurant "distance_from_home" must be a non-negative number');
    }
    distance_from_home = record.distance_from_home;
  }

  // Validate 'price_range' (optional, string or null)
  let price_range: string | null = null;
  if (record.price_range !== undefined && record.price_range !== null) {
    if (typeof record.price_range !== 'string') {
      throw new BadRequestError('Restaurant "price_range" must be a string');
    }
    price_range = record.price_range.trim();
  }

  // Validate 'phone' (optional, string or null)
  let phone: string | null = null;
  if (record.phone !== undefined && record.phone !== null) {
    if (typeof record.phone !== 'string') {
      throw new BadRequestError('Restaurant "phone" must be a string');
    }
    phone = record.phone.trim();
  }

  // Validate 'website' (optional, string or null)
  let website: string | null = null;
  if (record.website !== undefined && record.website !== null) {
    if (typeof record.website !== 'string') {
      throw new BadRequestError('Restaurant "website" must be a string');
    }
    website = record.website.trim();
  }

  // Validate 'hours' (optional, string or null)
  let hours: string | null = null;
  if (record.hours !== undefined && record.hours !== null) {
    if (typeof record.hours !== 'string') {
      throw new BadRequestError('Restaurant "hours" must be a string');
    }
    hours = record.hours.trim();
  }

  return {
    name: record.name.trim(),
    cuisine,
    address,
    rating,
    latitude,
    longitude,
    distance_from_home,
    price_range,
    phone,
    website,
    hours,
  };
}

/**
 * Validates request body for visit creation (POST) and update (PUT).
 * Throws BadRequestError if validation fails.
 */
export function validateVisitInput(body: unknown): ValidatedVisitInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new BadRequestError('Request body must be a JSON object');
  }

  const record = body as Record<string, unknown>;

  // Validate 'restaurantId'
  if (typeof record.restaurantId !== 'number' || !Number.isSafeInteger(record.restaurantId) || record.restaurantId <= 0) {
    throw new BadRequestError('Visit "restaurantId" must be a positive integer');
  }

  // Validate 'date' (YYYY-MM-DD format)
  if (typeof record.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
    throw new BadRequestError('Visit "date" must be a valid date in YYYY-MM-DD format');
  }

  // Validate 'amountSpent' (optional, number or null)
  let amountSpent: number | null = null;
  if (record.amountSpent !== undefined && record.amountSpent !== null) {
    if (typeof record.amountSpent !== 'number' || Number.isNaN(record.amountSpent) || record.amountSpent < 0) {
      throw new BadRequestError('Visit "amountSpent" must be a non-negative number');
    }
    amountSpent = record.amountSpent;
  }

  // Validate 'notes' (optional, string or null)
  let notes: string | null = null;
  if (record.notes !== undefined && record.notes !== null) {
    if (typeof record.notes !== 'string') {
      throw new BadRequestError('Visit "notes" must be a string');
    }
    notes = record.notes.trim();
  }

  return {
    restaurantId: record.restaurantId,
    date: record.date,
    amountSpent,
    notes,
  };
}

/**
 * Validates request body for order item creation (POST) and update (PUT).
 * Throws BadRequestError if validation fails.
 */
export function validateOrderItemInput(body: unknown): ValidatedOrderItemInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new BadRequestError('Request body must be a JSON object');
  }

  const record = body as Record<string, unknown>;

  // Validate 'itemName'
  if (typeof record.itemName !== 'string' || record.itemName.trim().length === 0) {
    throw new BadRequestError('Order item "itemName" is required and cannot be empty');
  }

  // Validate 'price'
  if (typeof record.price !== 'number' || Number.isNaN(record.price) || record.price < 0) {
    throw new BadRequestError('Order item "price" must be a non-negative number');
  }

  // Validate 'quantity'
  if (typeof record.quantity !== 'number' || !Number.isSafeInteger(record.quantity) || record.quantity <= 0) {
    throw new BadRequestError('Order item "quantity" must be a positive integer');
  }

  return {
    itemName: record.itemName.trim(),
    price: record.price,
    quantity: record.quantity,
  };
}
