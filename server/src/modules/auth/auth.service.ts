import { PrismaClient } from '@prisma/client';
import { DatabaseConnection } from '../../config/database';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AuthenticationError } from '../../core/errors/AuthenticationError';
import { ConflictError } from '../../core/errors/ConflictError';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from './auth.dto';

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseConnection.getInstance().getClient();
  }

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }

    const passwordHash = await hashPassword(data.password);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      },
    });

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken: generateAccessToken(tokenPayload),
      refreshToken: generateRefreshToken(tokenPayload),
    };
  }

  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is deactivated');
    }

    const isValid = await comparePassword(data.password, user.passwordHash);
    if (!isValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken: generateAccessToken(tokenPayload),
      refreshToken: generateRefreshToken(tokenPayload),
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await this.prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user || !user.isActive) {
        throw new AuthenticationError('User not found or deactivated');
      }

      const tokenPayload = { userId: user.id, email: user.email, role: user.role };
      return {
        accessToken: generateAccessToken(tokenPayload),
        refreshToken: generateRefreshToken(tokenPayload),
      };
    } catch {
      throw new AuthenticationError('Invalid refresh token');
    }
  }
}
