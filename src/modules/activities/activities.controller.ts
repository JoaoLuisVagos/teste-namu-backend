import type { Request, Response, NextFunction } from 'express';
import { activitiesService } from './activities.service';

export async function listActivities(req: Request, res: Response, next: NextFunction) {
  try {
    const programId = Number(req.params.programId);
    const data = await activitiesService.list(programId);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const programId = Number(req.params.programId);
    const id = Number(req.params.activityId);
    const activity = await activitiesService.get(programId, id);
    return res.json(activity);
  } catch (err) {
    return next(err);
  }
}

export async function createActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const programId = Number(req.params.programId);
    const created = await activitiesService.create(programId, req.body);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

export async function updateActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const programId = Number(req.params.programId);
    const id = Number(req.params.activityId);
    const updated = await activitiesService.update(programId, id, req.body);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

export async function deleteActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const programId = Number(req.params.programId);
    const id = Number(req.params.activityId);
    await activitiesService.remove(programId, id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}