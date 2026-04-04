import { PrismaClient } from '@prisma/client';

/**
 * Singleton Pattern: Ensures only one database connection instance exists.
 * - Private constructor prevents direct instantiation
 * - Static getInstance() provides global access point
 * - Encapsulation: PrismaClient is private, accessible only via getClient()
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getClient(): PrismaClient {
    return this.client;
  }

  public async connect(): Promise<void> {
    await this.client.$connect();
    console.log('Database connected successfully');
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
    console.log('Database disconnected');
  }
}
