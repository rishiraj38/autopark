'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import Link from 'next/link';

export default function Topbar() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      apiClient.get('/notifications/unread-count')
        .then((res) => setUnreadCount(res.data.data.count))
        .catch(() => {});
    }
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome back, {user?.firstName}
        </h2>
        <p className="text-sm text-gray-500">Manage your parking experience</p>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
