import { AppError } from '../../shared/errors/app-error';
import { participationsRepository } from './participations.repository';

export const participationsService = {
  async list() {
    return participationsRepository.findAll();
  },
  async get(id: number) {
    if (Number.isNaN(id)) throw new AppError('Invalid id', 400);
    const participation = await participationsRepository.findById(id);
    if (!participation) throw new AppError('Participation not found', 404);
    return participation;
  },
  async create(payload: { user_name?: string; activity_id?: number; notes?: string }) {
    if (!payload.user_name || !payload.user_name.trim()) throw new AppError('user_name is required', 400);
    if (typeof payload.activity_id !== 'number' || payload.activity_id <= 0) throw new AppError('activity_id must be a positive integer', 400);

    return participationsRepository.create({
      user_name: payload.user_name.trim(),
      activity_id: payload.activity_id,
      notes: payload.notes ?? undefined
    });
  },
  async update(id: number, payload: Partial<{ user_name: string; activity_id: number; completed_at: Date; notes: string }>) {
    if (payload.activity_id !== undefined && (typeof payload.activity_id !== 'number' || payload.activity_id <= 0)) throw new AppError('activity_id must be a positive integer', 400);

    const updated = await participationsRepository.update(id, payload as any);
    if (!updated) throw new AppError('Participation not found', 404);
    return updated;
  },
  async remove(id: number) {
    const deleted = await participationsRepository.delete(id);
    if (!deleted) throw new AppError('Participation not found', 404);
    return true;
  }
};


