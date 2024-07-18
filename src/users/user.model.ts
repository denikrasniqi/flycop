import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
