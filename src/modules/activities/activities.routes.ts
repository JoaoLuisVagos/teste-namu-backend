import { Router } from 'express';
import {
  listActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
} from './activities.controller';

const router = Router({ mergeParams: true });

router.get('/', listActivities);
router.get('/:activityId', getActivity);
router.post('/', createActivity);
router.put('/:activityId', updateActivity);
router.delete('/:activityId', deleteActivity);

export default router;