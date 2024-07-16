import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from 'src/authentication/dto/user-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        password: false, // Exclude the password field
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Map the Prisma user data to the UserDTO
    const usersDTO: UserDTO[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.userRoles.map((userRole) => userRole.role.name),
    }));

    return usersDTO;
  }

  async createUser(data: User): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    const username = this.getUserByUsername(data.username);
    const email = this.getUserEmail(data.email);

    return this.prisma.user.create({
      data,
    });
  }
  async getUserByUsername(username: string): Promise<Partial<User> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
        select: {
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserEmail(email: string): Promise<Partial<User> | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      let hasEmail;
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user === null) {
        hasEmail = true;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserFromToken(subId: string): Promise<any> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          id: subId,
        },
      });

      return { data };
    } catch (error) {
      throw error;
    }
  }
}
