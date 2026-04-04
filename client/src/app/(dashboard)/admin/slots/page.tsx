'use client';

import { useState } from 'react';
import { useParkingSlots, useParkingFloors } from '@/hooks/useParkingSlots';
import { cn, getSlotStatusColor } from '@/lib/utils';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Plus } from 'lucide-react';

export default function AdminSlotsPage() {
  const { slots, isLoading, refetch } = useParkingSlots();
  const { floors } = useParkingFloors();
  const [showFloorForm, setShowFloorForm] = useState(false);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [floorForm, setFloorForm] = useState({ name: '', level: 0, capacity: 20 });
  const [slotForm, setSlotForm] = useState({ slotNumber: '', type: 'REGULAR', floorId: '', pricePerHour: 5, distanceFromEntry: 0 });

  const createFloor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/parking/floors', floorForm);
      toast.success('Floor created');
      setShowFloorForm(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed');
    }
  };

  const createSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/parking/slots', slotForm);
      toast.success('Slot created');
      setShowSlotForm(false);
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiClient.put(`/parking/slots/${id}`, { status });
      toast.success('Status updated');
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Parking Slots</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowFloorForm(!showFloorForm)} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Plus className="w-4 h-4" /> Add Floor
          </button>
          <button onClick={() => setShowSlotForm(!showSlotForm)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Slot
          </button>
        </div>
      </div>

      {showFloorForm && (
        <form onSubmit={createFloor} className="bg-white rounded-xl border p-6 mb-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={floorForm.name} onChange={(e) => setFloorForm((f) => ({ ...f, name: e.target.value }))} className="px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <input type="number" value={floorForm.level} onChange={(e) => setFloorForm((f) => ({ ...f, level: parseInt(e.target.value) }))} className="px-4 py-2 border rounded-lg w-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input type="number" value={floorForm.capacity} onChange={(e) => setFloorForm((f) => ({ ...f, capacity: parseInt(e.target.value) }))} className="px-4 py-2 border rounded-lg w-24" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create Floor</button>
        </form>
      )}

      {showSlotForm && (
        <form onSubmit={createSlot} className="bg-white rounded-xl border p-6 mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slot Number</label>
            <input type="text" value={slotForm.slotNumber} onChange={(e) => setSlotForm((f) => ({ ...f, slotNumber: e.target.value }))} className="px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
            <select value={slotForm.floorId} onChange={(e) => setSlotForm((f) => ({ ...f, floorId: e.target.value }))} className="px-4 py-2 border rounded-lg" required>
              <option value="">Select</option>
              {floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={slotForm.type} onChange={(e) => setSlotForm((f) => ({ ...f, type: e.target.value }))} className="px-4 py-2 border rounded-lg">
              <option value="COMPACT">Compact</option>
              <option value="REGULAR">Regular</option>
              <option value="LARGE">Large</option>
              <option value="HANDICAPPED">Handicapped</option>
              <option value="ELECTRIC_CHARGING">Electric Charging</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price/hr</label>
            <input type="number" step="0.5" value={slotForm.pricePerHour} onChange={(e) => setSlotForm((f) => ({ ...f, pricePerHour: parseFloat(e.target.value) }))} className="px-4 py-2 border rounded-lg w-24" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create Slot</button>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/hr</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td className="px-6 py-4 text-sm font-medium">{slot.slotNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{slot.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{slot.floorName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">${slot.pricePerHour}</td>
                <td className="px-6 py-4">
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium text-white', getSlotStatusColor(slot.status))}>
                    {slot.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={slot.status}
                    onChange={(e) => updateStatus(slot.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
