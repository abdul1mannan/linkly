import { PrismaClient } from '@prisma/client';

interface GlobalForPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as typeof globalThis & GlobalForPrisma;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
