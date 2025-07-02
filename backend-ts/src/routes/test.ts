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

// Debug Python connection in aws
router.get('/debug/python', async (req: Request, res: Response) => {
  const pythonUrl = process.env.BACKEND_PY_URL;

  try {
    console.log(`🔍 Attempting to connect to: ${pythonUrl}/test/`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${pythonUrl}/test/`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Clear timeout if request succeeds
    const data = await response.json();

    res.json({
      success: true,
      python_url: pythonUrl,
      python_response: data,
      connection_method: 'internal_service_name',
    });
  } catch (error: any) {
    console.error('❌ Python connection error:', error);

    res.json({
      success: false,
      python_url: pythonUrl,
      error_message: error.message,
      error_code: error.code || 'UNKNOWN',
      dns_resolution: 'failed',
      suggestion: 'Check ECS service discovery or use private IP',
    });
  }
});

export default router;
