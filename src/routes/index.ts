import { Router } from 'express';
import programsRoutes from '../modules/programs/programs.routes';

const router = Router();
router.use('/programs', programsRoutes);

export default router;
