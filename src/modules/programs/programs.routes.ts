import { Router } from 'express';
import {
  listPrograms,
  getProgram,
  getProgramSummary,
  createProgram,
  updateProgram,
  deleteProgram
} from './programs.controller';
import { errorHandler } from '../../shared/middlewares/error-handler';
import activitiesRoutes from '../activities/activities.routes';

const router = Router();

router.get('/', listPrograms);
router.post('/', createProgram);
router.use('/:programId/activities', activitiesRoutes);
router.get('/:programId/summary', getProgramSummary);
router.get('/:id', getProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

router.use(errorHandler as any);

export default router;
