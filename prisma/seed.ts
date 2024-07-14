import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  // Seed the User table
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('password', 10),
      firstName: 'Admin',
      lastName: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Seed the UserRole table
  await prisma.userRole.create({
    data: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
