import { PrismaClient } from '@prisma/client';

/**
 * Creates a new instance of PrismaClient.
 *
 * @returns {PrismaClient} - A new PrismaClient instance.
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  });
};

// Extend globalThis to include a prismaGlobal property for better typing
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Singleton instance of PrismaClient, using a global instance in development mode
 * to avoid creating new instances on each request.
 *
 * @constant
 * @type {PrismaClient}
 */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// If in development, assign the global prisma instance for reuse
if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production')
  globalThis.prismaGlobal = prisma;
