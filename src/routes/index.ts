import { Router } from 'express';
import programsRoutes from '../modules/programs/programs.routes';
import participationsRoutes from '../modules/participations/participations.routes';

const router = Router();
router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/programs', programsRoutes);
router.use('/participations', participationsRoutes);

export default router;
