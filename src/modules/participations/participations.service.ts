import { AppError } from '../../shared/errors/app-error';
import { activitiesRepository } from '../activities/activities.repository';
import { participationsRepository } from './participations.repository';

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export const participationsService = {
  async list() {
    return participationsRepository.findAll();
  },
  async get(id: number) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const participation = await participationsRepository.findById(id);
    if (!participation) throw new AppError('Participation not found', 404);
    return participation;
  },
  async create(payload: { user_name?: string; activity_id?: number; notes?: string }) {
    if (!payload.user_name || !payload.user_name.trim()) throw new AppError('user_name is required', 400);
    const activityId = payload.activity_id;
    if (!isPositiveInteger(activityId)) throw new AppError('activity_id must be a positive integer', 400);

    const activity = await activitiesRepository.findByIdOnly(activityId);
    if (!activity) throw new AppError('Activity not found', 404);

    return participationsRepository.create({
      user_name: payload.user_name.trim(),
      activity_id: activityId,
      notes: payload.notes ?? undefined
    });
  },
  async update(id: number, payload: Partial<{ user_name: string; activity_id: number; completed_at: Date; notes: string }>) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    if (payload.user_name !== undefined && !payload.user_name.trim()) throw new AppError('user_name is required', 400);
    if (payload.activity_id !== undefined && !isPositiveInteger(payload.activity_id)) throw new AppError('activity_id must be a positive integer', 400);

    if (payload.activity_id !== undefined) {
      const activity = await activitiesRepository.findByIdOnly(payload.activity_id);
      if (!activity) throw new AppError('Activity not found', 404);
    }

    const updated = await participationsRepository.update(id, payload as any);
    if (!updated) throw new AppError('Participation not found', 404);
    return updated;
  },
  async remove(id: number) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const deleted = await participationsRepository.delete(id);
    if (!deleted) throw new AppError('Participation not found', 404);
    return true;
  }
};


