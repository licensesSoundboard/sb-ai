// src/app.ts
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json()); // Add this - you were missing JSON parsing middleware

// Add health check endpoints for ALB (BEFORE other routes)
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'AI Framework Backend',
    timestamp: new Date().toISOString(),
    service: 'backend-ts',
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'backend-ts',
  });
});

// Your existing API routes
app.use('/api', routes);

// Error handling middleware (AFTER routes)
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.error('Invalid JSON received:', err);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next(err);
});

export default app;
