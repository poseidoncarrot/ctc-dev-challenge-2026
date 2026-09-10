import { getSpendingStats, getMonthlySpending, getSpendingByRestaurant, getSpendingByCuisine } from '@/lib/apiClient';

export default async function StatsPage() {
  const [stats, monthly, byRestaurant, byCuisine] = await Promise.all([
    getSpendingStats(),
    getMonthlySpending(),
    getSpendingByRestaurant(),
    getSpendingByCuisine(),
  ]);

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">Spending Analytics</h2>
      
      {/* Overall Stats */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <h3 className="font-medium mb-3">Overall Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total Visits</p>
            <p className="text-xl font-semibold">{stats.total_visits}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Spent</p>
            <p className="text-xl font-semibold">${Number(stats.total_spent).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Average per Visit</p>
            <p className="text-xl font-semibold">${Number(stats.average_per_visit).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Range</p>
            <p className="text-xl font-semibold">
              ${Number(stats.min_spent).toFixed(2)} - ${Number(stats.max_spent).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Spending */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <h3 className="font-medium mb-3">Monthly Spending</h3>
        {monthly.length === 0 ? (
          <p className="text-sm text-gray-500">No data available</p>
        ) : (
          <div className="space-y-2">
            {monthly.map((item: any) => (
              <div key={item.month} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.month}</span>
                <span className="font-medium">
                  {item.visit_count} visits · ${Number(item.total_spent).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* By Restaurant */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <h3 className="font-medium mb-3">Spending by Restaurant</h3>
        {byRestaurant.length === 0 ? (
          <p className="text-sm text-gray-500">No data available</p>
        ) : (
          <div className="space-y-2">
            {byRestaurant.map((item: any) => (
              <div key={item.restaurant_id} className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{item.restaurant_name}</span>
                  <span className="text-gray-500 ml-2">{item.cuisine}</span>
                </div>
                <span className="font-medium">
                  {item.visit_count} visits · ${Number(item.total_spent).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* By Cuisine */}
      <div className="rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <h3 className="font-medium mb-3">Spending by Cuisine</h3>
        {byCuisine.length === 0 ? (
          <p className="text-sm text-gray-500">No data available</p>
        ) : (
          <div className="space-y-2">
            {byCuisine.map((item: any) => (
              <div key={item.cuisine} className="flex justify-between text-sm">
                <span className="font-medium">{item.cuisine || 'Uncategorized'}</span>
                <span className="font-medium">
                  {item.visit_count} visits · ${Number(item.total_spent).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
