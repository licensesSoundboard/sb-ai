import prisma from '@/lib/prisma';

export const requireDatabase = () => {
  if (!prisma) {
    throw new Error('Database not available');
  }
  return prisma;
};
