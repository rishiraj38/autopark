'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification } from '@/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';

export function useWebSocket(userId: string | undefined) {
  const socketRef = useRef<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io(WS_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join', userId);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('notification', (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on('slot-update', () => {
      // Trigger refetch in consuming components
      window.dispatchEvent(new CustomEvent('slot-update'));
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return { notifications, isConnected, clearNotifications: () => setNotifications([]) };
}
