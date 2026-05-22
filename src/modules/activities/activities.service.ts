import { AppError } from '../../shared/errors/app-error';
import { programsRepository } from '../programs/programs.repository';
import { activitiesRepository } from './activities.repository';

const allowedDays = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export const activitiesService = {
  async list(programId: number) {
    if (!isPositiveInteger(programId)) throw new AppError('Invalid programId', 400);
    const program = await programsRepository.findById(programId);
    if (!program) throw new AppError('Program not found', 404);
    return activitiesRepository.findAllByProgram(programId);
  },
  async get(programId: number, id: number) {
    if (!isPositiveInteger(programId) || !isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const activity = await activitiesRepository.findById(programId, id);
    if (!activity) throw new AppError('Activity not found', 404);
    return activity;
  },
  async create(programId: number, payload: { title?: string; description?: string; day_of_week?: string; duration_minutes?: number }) {
    if (!isPositiveInteger(programId)) throw new AppError('Invalid programId', 400);
    const program = await programsRepository.findById(programId);
    if (!program) throw new AppError('Program not found', 404);
    if (!payload.title || !payload.title.trim()) throw new AppError('title is required', 400);
    if (!payload.day_of_week || !allowedDays.includes(payload.day_of_week)) throw new AppError('Invalid day_of_week', 400);
    const durationMinutes = payload.duration_minutes;
    if (!isPositiveInteger(durationMinutes)) throw new AppError('duration_minutes must be a positive integer', 400);

    return activitiesRepository.create(programId, {
      title: payload.title.trim(),
      description: payload.description?.trim() || undefined,
      day_of_week: payload.day_of_week,
      duration_minutes: durationMinutes
    });
  },
  async update(programId: number, id: number, payload: Partial<{ title: string; description: string; day_of_week: string; duration_minutes: number }>) {
    if (!isPositiveInteger(programId) || !isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    if (payload.title !== undefined && !payload.title.trim()) throw new AppError('title is required', 400);
    if (payload.day_of_week !== undefined && !allowedDays.includes(payload.day_of_week)) throw new AppError('Invalid day_of_week', 400);
    if (payload.duration_minutes !== undefined && !isPositiveInteger(payload.duration_minutes)) throw new AppError('duration_minutes must be a positive integer', 400);

    const updated = await activitiesRepository.update(programId, id, payload as any);
    if (!updated) throw new AppError('Activity not found', 404);
    return updated;
  },
  async remove(programId: number, id: number) {
    if (!isPositiveInteger(programId) || !isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const deleted = await activitiesRepository.delete(programId, id);
    if (!deleted) throw new AppError('Activity not found', 404);
    return true;
  }
};