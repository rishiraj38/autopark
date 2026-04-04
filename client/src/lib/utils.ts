export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getSlotStatusColor(status: string): string {
  switch (status) {
    case 'AVAILABLE': return 'bg-green-500';
    case 'OCCUPIED': return 'bg-red-500';
    case 'RESERVED': return 'bg-yellow-500';
    case 'MAINTENANCE': return 'bg-gray-500';
    default: return 'bg-gray-300';
  }
}

export function getBookingStatusColor(status: string): string {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'COMPLETED': return 'bg-gray-100 text-gray-800';
    case 'CANCELLED': return 'bg-red-100 text-red-800';
    case 'EXPIRED': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getVehicleTypeIcon(type: string): string {
  switch (type) {
    case 'CAR': return '🚗';
    case 'MOTORCYCLE': return '🏍️';
    case 'TRUCK': return '🚛';
    case 'ELECTRIC': return '⚡';
    default: return '🚗';
  }
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
