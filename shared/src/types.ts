// Shared types between client and server

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum VehicleType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  TRUCK = 'TRUCK',
  ELECTRIC = 'ELECTRIC',
}

export enum SlotType {
  COMPACT = 'COMPACT',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
  HANDICAPPED = 'HANDICAPPED',
  ELECTRIC_CHARGING = 'ELECTRIC_CHARGING',
}

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  WALLET = 'WALLET',
}

export enum NotificationType {
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  VEHICLE_ENTERED = 'VEHICLE_ENTERED',
  VEHICLE_EXITED = 'VEHICLE_EXITED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SLOT_AVAILABLE = 'SLOT_AVAILABLE',
  BOOKING_EXPIRING = 'BOOKING_EXPIRING',
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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
