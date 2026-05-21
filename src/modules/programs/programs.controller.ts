import type { Request, Response, NextFunction } from 'express';
import { programsService } from './programs.service';

export async function listPrograms(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await programsService.list();
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getProgram(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const program = await programsService.get(id);
    return res.json(program);
  } catch (err) {
    return next(err);
  }
}

export async function createProgram(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await programsService.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

export async function updateProgram(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updated = await programsService.update(id, req.body);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

export async function deleteProgram(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await programsService.remove(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}
