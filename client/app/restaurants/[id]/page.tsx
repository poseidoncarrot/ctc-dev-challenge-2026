import { getRestaurant } from '@/lib/apiClient';
import Link from 'next/link';

export default async function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const restaurant = await getRestaurant(params.id);

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to restaurants
      </Link>
      
      <div className="mt-4 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <span className="text-lg text-gray-600">
            {restaurant.rating}★
          </span>
        </div>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p><strong>Cuisine:</strong> {restaurant.cuisine || 'N/A'}</p>
          <p><strong>Address:</strong> {restaurant.address || 'N/A'}</p>
          {restaurant.phone && <p><strong>Phone:</strong> {restaurant.phone}</p>}
          {restaurant.website && (
            <p><strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{restaurant.website}</a></p>
          )}
          {restaurant.hours && <p><strong>Hours:</strong> {restaurant.hours}</p>}
          {restaurant.distance_from_home && <p><strong>Distance:</strong> {restaurant.distance_from_home} miles</p>}
          {restaurant.price_range && <p><strong>Price Range:</strong> {restaurant.price_range}</p>}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Visit History</h2>
          <p className="text-sm text-gray-500">
            Visit history will be displayed here. (Coming soon)
          </p>
        </div>
      </div>
    </div>
  );
}
