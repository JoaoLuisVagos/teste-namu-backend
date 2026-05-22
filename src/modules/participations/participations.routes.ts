import { Router } from 'express';
import {
  listParticipations,
  getParticipation,
  createParticipation,
  updateParticipation,
  deleteParticipation
} from './participations.controller';
import { errorHandler } from '../../shared/middlewares/error-handler';

const router = Router();

router.get('/', listParticipations);
router.get('/:id', getParticipation);
router.post('/', createParticipation);
router.put('/:id', updateParticipation);
router.delete('/:id', deleteParticipation);

router.use(errorHandler as any);

export default router;