import { PrismaClient, Role, VehicleType, SlotType, SlotStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@autopark.com' },
    update: {},
    create: {
      email: 'admin@autopark.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: Role.ADMIN,
    },
  });
  console.log(`Admin created: ${admin.email}`);

  // Create regular users
  const userPassword = await bcrypt.hash('user123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      passwordHash: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      passwordHash: userPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567892',
      role: Role.USER,
    },
  });
  console.log('Users created');

  // Create vehicles
  await prisma.vehicle.upsert({
    where: { licensePlate: 'ABC-1234' },
    update: {},
    create: {
      licensePlate: 'ABC-1234',
      type: VehicleType.CAR,
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver',
      ownerId: user1.id,
    },
  });

  await prisma.vehicle.upsert({
    where: { licensePlate: 'XYZ-5678' },
    update: {},
    create: {
      licensePlate: 'XYZ-5678',
      type: VehicleType.MOTORCYCLE,
      make: 'Honda',
      model: 'CBR',
      color: 'Red',
      ownerId: user1.id,
    },
  });

  await prisma.vehicle.upsert({
    where: { licensePlate: 'EV-9012' },
    update: {},
    create: {
      licensePlate: 'EV-9012',
      type: VehicleType.ELECTRIC,
      make: 'Tesla',
      model: 'Model 3',
      color: 'White',
      ownerId: user2.id,
    },
  });

  await prisma.vehicle.upsert({
    where: { licensePlate: 'TRK-3456' },
    update: {},
    create: {
      licensePlate: 'TRK-3456',
      type: VehicleType.TRUCK,
      make: 'Ford',
      model: 'F-150',
      color: 'Black',
      ownerId: user2.id,
    },
  });
  console.log('Vehicles created');

  // Create parking floors
  const floor1 = await prisma.parkingFloor.create({
    data: { name: 'Ground Floor', level: 0, capacity: 20 },
  });

  const floor2 = await prisma.parkingFloor.create({
    data: { name: 'First Floor', level: 1, capacity: 20 },
  });

  const floor3 = await prisma.parkingFloor.create({
    data: { name: 'Basement', level: -1, capacity: 15 },
  });
  console.log('Parking floors created');

  // Create parking slots
  const slotConfigs = [
    // Ground Floor - Mixed
    { slotNumber: 'G-001', type: SlotType.COMPACT, floorId: floor1.id, pricePerHour: 2.0, distance: 1 },
    { slotNumber: 'G-002', type: SlotType.COMPACT, floorId: floor1.id, pricePerHour: 2.0, distance: 2 },
    { slotNumber: 'G-003', type: SlotType.REGULAR, floorId: floor1.id, pricePerHour: 5.0, distance: 3 },
    { slotNumber: 'G-004', type: SlotType.REGULAR, floorId: floor1.id, pricePerHour: 5.0, distance: 4 },
    { slotNumber: 'G-005', type: SlotType.REGULAR, floorId: floor1.id, pricePerHour: 5.0, distance: 5 },
    { slotNumber: 'G-006', type: SlotType.LARGE, floorId: floor1.id, pricePerHour: 8.0, distance: 6 },
    { slotNumber: 'G-007', type: SlotType.LARGE, floorId: floor1.id, pricePerHour: 8.0, distance: 7 },
    { slotNumber: 'G-008', type: SlotType.HANDICAPPED, floorId: floor1.id, pricePerHour: 3.0, distance: 1 },
    { slotNumber: 'G-009', type: SlotType.ELECTRIC_CHARGING, floorId: floor1.id, pricePerHour: 6.0, distance: 2 },
    { slotNumber: 'G-010', type: SlotType.ELECTRIC_CHARGING, floorId: floor1.id, pricePerHour: 6.0, distance: 3 },
    // First Floor
    { slotNumber: 'F1-001', type: SlotType.COMPACT, floorId: floor2.id, pricePerHour: 1.5, distance: 10 },
    { slotNumber: 'F1-002', type: SlotType.REGULAR, floorId: floor2.id, pricePerHour: 4.0, distance: 11 },
    { slotNumber: 'F1-003', type: SlotType.REGULAR, floorId: floor2.id, pricePerHour: 4.0, distance: 12 },
    { slotNumber: 'F1-004', type: SlotType.REGULAR, floorId: floor2.id, pricePerHour: 4.0, distance: 13 },
    { slotNumber: 'F1-005', type: SlotType.LARGE, floorId: floor2.id, pricePerHour: 7.0, distance: 14 },
    // Basement
    { slotNumber: 'B-001', type: SlotType.REGULAR, floorId: floor3.id, pricePerHour: 3.0, distance: 15 },
    { slotNumber: 'B-002', type: SlotType.REGULAR, floorId: floor3.id, pricePerHour: 3.0, distance: 16 },
    { slotNumber: 'B-003', type: SlotType.LARGE, floorId: floor3.id, pricePerHour: 5.0, distance: 17 },
    { slotNumber: 'B-004', type: SlotType.LARGE, floorId: floor3.id, pricePerHour: 5.0, distance: 18 },
    { slotNumber: 'B-005', type: SlotType.COMPACT, floorId: floor3.id, pricePerHour: 1.0, distance: 19 },
  ];

  for (const slot of slotConfigs) {
    await prisma.parkingSlot.create({
      data: {
        slotNumber: slot.slotNumber,
        type: slot.type,
        status: SlotStatus.AVAILABLE,
        floorId: slot.floorId,
        pricePerHour: slot.pricePerHour,
        distanceFromEntry: slot.distance,
      },
    });
  }
  console.log(`${slotConfigs.length} parking slots created`);

  console.log('Seeding completed!');
  console.log('\nTest credentials:');
  console.log('Admin: admin@autopark.com / admin123');
  console.log('User1: john@example.com / user123');
  console.log('User2: jane@example.com / user123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
