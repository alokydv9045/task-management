import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async guestLogin(): Promise<{ access_token: string; user: Partial<User> }> {
    try {
      // Create a temporary guest user
      const user = await this.prisma.user.create({
        data: {
          isGuest: true,
        },
      });

      // Seed some initial tasks for the guest so the board looks populated
      await this.prisma.task.createMany({
        data: [
          { title: 'Design Homepage', status: 'TODO', priority: 'HIGH', creatorId: user.id },
          { title: 'Setup Authentication', status: 'DOING', priority: 'MEDIUM', creatorId: user.id },
          { title: 'Database Schema Design', status: 'COMPLETED', priority: 'LOW', creatorId: user.id },
          { title: 'User Interviews', status: 'ON_HOLD', priority: 'MEDIUM', creatorId: user.id },
        ]
      });

      const payload = { sub: user.id, isGuest: user.isGuest };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user.id,
          isGuest: user.isGuest,
        },
      };
    } catch (error) {
      this.logger.error('Guest login failed', error?.stack || error);
      throw new InternalServerErrorException('Guest login failed. Please try again.');
    }
  }
}
