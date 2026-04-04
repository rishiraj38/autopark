export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  type: 'CAR' | 'MOTORCYCLE' | 'TRUCK' | 'ELECTRIC';
  make: string | null;
  model: string | null;
  color: string | null;
  ownerId: string;
  compatibleSlotTypes: string[];
  sizeMultiplier: number;
  createdAt: string;
}

export interface ParkingSlot {
  id: string;
  slotNumber: string;
  type: 'COMPACT' | 'REGULAR' | 'LARGE' | 'HANDICAPPED' | 'ELECTRIC_CHARGING';
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';
  floorId: string;
  floorName?: string;
  floorLevel?: number;
  pricePerHour: number;
  distanceFromEntry: number;
  createdAt: string;
}

export interface ParkingFloor {
  id: string;
  name: string;
  level: number;
  capacity: number;
  slotsCount?: number;
  availableCount?: number;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  vehicleType: string;
  slotId: string;
  slotNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  startTime: string;
  endTime: string;
  actualEntry: string | null;
  actualExit: string | null;
  totalAmount: number | null;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalVehicles: number;
  totalBookings: number;
  activeBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

export interface OccupancyReport {
  totalSlots: number;
  occupied: number;
  available: number;
  reserved: number;
  maintenance: number;
  occupancyRate: number;
}

export interface RevenueReport {
  totalRevenue: number;
  periodRevenue: number;
  period: string;
  transactionCount: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
    fields?: Record<string, string>;
  };
}
