import { getVisit, getOrderItems } from '@/lib/apiClient';
import Link from 'next/link';

export default async function VisitDetailPage({ params }: { params: { id: string } }) {
  const visit = await getVisit(params.id);
  const orderItems = await getOrderItems(params.id);

  return (
    <div>
      <Link href="/visits" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to visits
      </Link>
      
      <div className="mt-4 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold">Visit on {visit.date}</h1>
          <span className="text-lg text-gray-600">
            ${visit.amountSpent?.toFixed(2) || '0.00'}
          </span>
        </div>
        
        {visit.notes && (
          <p className="mt-2 text-gray-600">{visit.notes}</p>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Order Items</h2>
          {orderItems.length === 0 ? (
            <p className="text-sm text-gray-500">No items recorded for this visit.</p>
          ) : (
            <ul className="space-y-2">
              {orderItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                >
                  <span>
                    {item.itemName} × {item.quantity}
                  </span>
                  <span className="text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
