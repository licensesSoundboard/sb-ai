import { Router } from 'express';
import healthRoutes from './health';
import testRoutes from './tests';

const router = Router();

// Mount routes
router.use('/health', healthRoutes);
router.use('/', testRoutes);

export default router;
