import type { Request, Response, NextFunction } from 'express';
import { participationsService } from './participations.service';

export async function listParticipations(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await participationsService.list();
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getParticipation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const participation = await participationsService.get(id);
    return res.json(participation);
  } catch (err) {
    return next(err);
  }
}

export async function createParticipation(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await participationsService.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

export async function updateParticipation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updated = await participationsService.update(id, req.body);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

export async function deleteParticipation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await participationsService.remove(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}   