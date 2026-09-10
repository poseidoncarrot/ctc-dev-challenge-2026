/**
 * The client side of the API: helpers the frontend uses to call the endpoints.
 *
 * Don't confuse this with `app/api/`, which is the other side of the same
 * boundary - the route handlers that *implement* those endpoints. This file
 * only ever talks to them over HTTP.
 *
 * The shapes these helpers return live in `lib/types.ts`, shared with the
 * handlers that produce them.
 */
import type { Restaurant, Visit, OrderItem } from './types';

// We read a base URL from the environment because Server Components fetch on
// the server, where relative URLs don't resolve - so we need an absolute origin.
// It's the same app on the same port, so this is normally just localhost:3000.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Fetch every restaurant from the API.
 *
 * NOTE: this is a bare fetch with no error handling. It does not check the
 * response status and it does not catch network failures - callers get whatever
 * `res.json()` produces, including on a 500.
 */
export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_URL}/api/restaurants`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch a single restaurant by id.
 */
export async function getRestaurant(id: number | string): Promise<Restaurant> {
  const res = await fetch(`${API_URL}/api/restaurants/${id}`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch all visits.
 */
export async function getVisits(startDate?: string, endDate?: string): Promise<Visit[]> {
  const url = new URL(`${API_URL}/api/visits`);
  if (startDate) url.searchParams.set('startDate', startDate);
  if (endDate) url.searchParams.set('endDate', endDate);
  const res = await fetch(url.toString(), { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch a single visit by id.
 */
export async function getVisit(id: number | string): Promise<Visit> {
  const res = await fetch(`${API_URL}/api/visits/${id}`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch order items for a specific visit.
 */
export async function getOrderItems(visitId: number | string): Promise<OrderItem[]> {
  const res = await fetch(`${API_URL}/api/visits/${visitId}/items`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch overall spending statistics.
 */
export async function getSpendingStats() {
  const res = await fetch(`${API_URL}/api/stats/spending`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch monthly spending statistics.
 */
export async function getMonthlySpending() {
  const res = await fetch(`${API_URL}/api/stats/spending/monthly`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch spending by restaurant.
 */
export async function getSpendingByRestaurant() {
  const res = await fetch(`${API_URL}/api/stats/spending/by-restaurant`, { cache: 'no-store' });
  return res.json();
}

/**
 * Fetch spending by cuisine.
 */
export async function getSpendingByCuisine() {
  const res = await fetch(`${API_URL}/api/stats/spending/by-cuisine`, { cache: 'no-store' });
  return res.json();
}
