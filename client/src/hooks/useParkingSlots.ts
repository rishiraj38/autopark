'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api-client';
import { ParkingSlot, ParkingFloor } from '@/types';

export function useParkingSlots(filters?: { status?: string; type?: string; floorId?: string }) {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters?.status) params.set('status', filters.status);
      if (filters?.type) params.set('type', filters.type);
      if (filters?.floorId) params.set('floorId', filters.floorId);

      const res = await apiClient.get(`/parking/slots?${params.toString()}`);
      setSlots(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch slots');
    } finally {
      setIsLoading(false);
    }
  }, [filters?.status, filters?.type, filters?.floorId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return { slots, isLoading, error, refetch: fetchSlots };
}

export function useParkingFloors() {
  const [floors, setFloors] = useState<ParkingFloor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/parking/floors')
      .then((res) => setFloors(res.data.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return { floors, isLoading };
}
