'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { DashboardStats, OccupancyReport } from '@/types';
import { formatCurrency } from '@/lib/utils';
import StatCard from '@/components/ui/StatCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Users, Car, CalendarCheck, DollarSign, ParkingCircle, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PIE_COLORS = ['#22c55e', '#ef4444', '#eab308', '#6b7280'];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [occupancy, setOccupancy] = useState<OccupancyReport | null>(null);
  const [peakHours, setPeakHours] = useState<Array<{ hour: number; bookingCount: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/reports/dashboard'),
      apiClient.get('/reports/occupancy'),
      apiClient.get('/reports/peak-hours'),
    ])
      .then(([statsRes, occRes, peakRes]) => {
        setStats(statsRes.data.data);
        setOccupancy(occRes.data.data);
        setPeakHours(peakRes.data.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const pieData = occupancy ? [
    { name: 'Available', value: occupancy.available },
    { name: 'Occupied', value: occupancy.occupied },
    { name: 'Reserved', value: occupancy.reserved },
    { name: 'Maintenance', value: occupancy.maintenance },
  ] : [];

  const peakData = peakHours.map((h) => ({
    hour: `${h.hour}:00`,
    bookings: h.bookingCount,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={Users} color="bg-blue-600" />
        <StatCard title="Vehicles" value={stats?.totalVehicles ?? 0} icon={Car} color="bg-green-600" />
        <StatCard title="Total Bookings" value={stats?.totalBookings ?? 0} icon={CalendarCheck} color="bg-purple-600" />
        <StatCard title="Active Now" value={stats?.activeBookings ?? 0} icon={Activity} color="bg-orange-600" />
        <StatCard title="Occupancy" value={`${stats?.occupancyRate ?? 0}%`} icon={ParkingCircle} color="bg-red-600" />
        <StatCard title="Revenue" value={formatCurrency(stats?.totalRevenue ?? 0)} icon={DollarSign} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Slot Occupancy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
