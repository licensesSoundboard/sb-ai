// src/app.ts
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());

// Alternative: Catch JSON errors globally
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.error('Invalid JSON received:', err);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next(err);
});

app.use('/api', routes);

export default app;
