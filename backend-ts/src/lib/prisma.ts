import { PrismaClient } from '@prisma/client';

/**
 * Creates a new instance of PrismaClient.
 *
 * @returns {PrismaClient} - A new PrismaClient instance.
 */
const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn('DATABASE_URL not provided');
    throw new Error('DATABASE_URL environment variable is required');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  });
};

// Extended globalThis to include a prismaGlobal property for better typing
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Singleton instance of PrismaClient, using a global instance in development mode
 * to avoid creating new instances on each request.
 *
 * @constant
 * @type {PrismaClient | null}
 */
let prisma: PrismaClient | null = null;

try {
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  // If in development, assign the global prisma instance for reuse
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
  }
} catch (error) {
  console.error(
    'Failed to initialize Prisma:',
    error instanceof Error ? error.message : 'Unknown error',
  );
  prisma = null;
}

export default prisma;
