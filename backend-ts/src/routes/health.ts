import { Router, Request, Response } from 'express';
import prisma from '@/lib/prisma';

const router = Router();

// Basic health check
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ai-framework-backend',
  });
});

// Database health check
router.get('/db', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
});

// Python service health check
router.get('/python', async (req: Request, res: Response) => {
  try {
    const pythonUrl = process.env.BACKEND_PY_URL;
    if (!pythonUrl) {
      throw new Error('BACKEND_PY_URL not configured');
    }

    const response = await fetch(`${pythonUrl}/health`);
    const data = await response.json();

    res.json({
      status: 'healthy',
      python_service: 'connected',
      python_response: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      python_service: 'disconnected',
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
