// src/routes/test.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Simple test endpoint
router.get('/testCall', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Test call successful!',
    timestamp: new Date().toISOString(),
    server: 'backend-ts',
    port: process.env.PORT || 4000,
  });
});

// Test endpoint with POST data
router.post('/testCall', (req: Request, res: Response) => {
  const { name, data } = req.body;

  res.json({
    success: true,
    message: 'POST test call successful!',
    received_data: {
      name,
      data,
      body_keys: Object.keys(req.body),
    },
    timestamp: new Date().toISOString(),
    server: 'backend-ts',
  });
});

// Test endpoint that calls Python service
router.get(
  '/testCall/python',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const pythonUrl = process.env.BACKEND_PY_URL;

      if (!pythonUrl) {
        res.status(500).json({
          success: false,
          error: 'Python service URL not configured',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const response = await fetch(`${pythonUrl}/test`);
      const pythonData = await response.json();

      res.json({
        success: true,
        message: 'Successfully called Python service',
        python_response: pythonData,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to call Python service',
        details: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  },
);

export default router;
