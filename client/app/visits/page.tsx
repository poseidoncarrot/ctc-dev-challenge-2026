import { getVisits } from '@/lib/apiClient';
import Link from 'next/link';

export default async function VisitsPage() {
  const visits = await getVisits();

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">Visit History</h2>
      
      {visits.length === 0 ? (
        <p className="text-gray-500">No visits recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {visits.map((visit) => (
            <li
              key={visit.id}
              className="rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm"
            >
              <div className="flex items-baseline justify-between">
                <Link href={`/visits/${visit.id}`} className="font-medium hover:text-blue-600">
                  Visit on {visit.date}
                </Link>
                <span className="text-sm text-gray-600">
                  ${visit.amountSpent?.toFixed(2) || '0.00'}
                </span>
              </div>
              {visit.notes && (
                <p className="mt-1 text-sm text-gray-600">{visit.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
