import { getRestaurants } from '@/lib/apiClient';
import Link from 'next/link';

// Server component. Fetches restaurants on each request and renders a plain
// list. There is no loading state, no empty state, and no error handling: if
// the API is down or returns something unexpected, this throws.
export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">Restaurants</h2>
      <ul className="space-y-3">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/restaurants/${restaurant.id}`}
            className="block rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-medium hover:text-blue-600">
                {restaurant.name}
              </span>
              <span className="text-sm text-gray-500">
                {restaurant.rating}★
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {restaurant.cuisine} · {restaurant.address}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
              {restaurant.price_range && (
                <span className="bg-gray-100 px-2 py-1 rounded">{restaurant.price_range}</span>
              )}
              {restaurant.distance_from_home && (
                <span>{restaurant.distance_from_home} mi</span>
              )}
              {restaurant.phone && (
                <span>{restaurant.phone}</span>
              )}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
