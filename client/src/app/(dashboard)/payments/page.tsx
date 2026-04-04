'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Payment } from '@/types';
import { formatDateTime, formatCurrency, cn } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/payments')
      .then((res) => setPayments(res.data.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h1>

      {payments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No payments yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{p.transactionId || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(p.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.method.replace('_', ' ')}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      p.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      p.status === 'REFUNDED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.paidAt ? formatDateTime(p.paidAt) : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
