import { Router } from 'express';
import {
  listPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram
} from './programs.controller';
import { errorHandler } from '../../shared/middlewares/error-handler';

const router = Router();

router.get('/', listPrograms);
router.get('/:id', getProgram);
router.post('/', createProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

router.use(errorHandler as any);

export default router;
