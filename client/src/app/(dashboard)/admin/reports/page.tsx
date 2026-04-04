'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { RevenueReport } from '@/types';
import { formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatCard from '@/components/ui/StatCard';
import { DollarSign, TrendingUp, Hash } from 'lucide-react';

export default function AdminReportsPage() {
  const [revenue, setRevenue] = useState<RevenueReport | null>(null);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [popularSlots, setPopularSlots] = useState<Array<{ slotNumber: string; floorName: string; bookingCount: number; totalRevenue: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get(`/reports/revenue?period=${period}`),
      apiClient.get('/reports/popular-slots'),
    ])
      .then(([revRes, popRes]) => {
        setRevenue(revRes.data.data);
        setPopularSlots(popRes.data.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [period]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>

      {/* Revenue */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <select value={period} onChange={(e) => setPeriod(e.target.value as any)} className="px-3 py-1.5 text-sm border rounded-lg">
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Revenue" value={formatCurrency(revenue?.totalRevenue ?? 0)} icon={DollarSign} color="bg-emerald-600" />
          <StatCard title={`${period.charAt(0).toUpperCase() + period.slice(1)} Revenue`} value={formatCurrency(revenue?.periodRevenue ?? 0)} icon={TrendingUp} color="bg-blue-600" />
          <StatCard title="Transactions" value={revenue?.transactionCount ?? 0} icon={Hash} color="bg-purple-600" />
        </div>
      </div>

      {/* Popular Slots */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Popular Slots (Top 10)</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {popularSlots.map((slot, idx) => (
              <tr key={slot.slotNumber}>
                <td className="px-6 py-4 text-sm font-medium">#{idx + 1}</td>
                <td className="px-6 py-4 text-sm font-medium">{slot.slotNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{slot.floorName}</td>
                <td className="px-6 py-4 text-sm">{slot.bookingCount}</td>
                <td className="px-6 py-4 text-sm font-medium">{formatCurrency(slot.totalRevenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
