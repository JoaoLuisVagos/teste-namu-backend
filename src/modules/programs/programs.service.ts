import { AppError } from '../../shared/errors/app-error';
import { programsRepository } from './programs.repository';

const allowedCategories = ['meditacao', 'exercicio', 'nutricao'];

export const programsService = {
  async list() {
    return programsRepository.findAll();
  },
  async get(id: number) {
    if (Number.isNaN(id)) throw new AppError('Invalid id', 400);
    const program = await programsRepository.findById(id);
    if (!program) throw new AppError('Program not found', 404);
    return program;
  },
  async create(payload: { name?: string; description?: string; category?: string; duration_weeks?: number }) {
    if (!payload.name || !payload.name.trim()) throw new AppError('name is required', 400);
    if (!payload.category || !allowedCategories.includes(payload.category)) throw new AppError('Invalid category', 400);
    if (typeof payload.duration_weeks !== 'number' || payload.duration_weeks <= 0) throw new AppError('duration_weeks must be a positive integer', 400);

    return programsRepository.create({
      name: payload.name.trim(),
      description: payload.description ?? undefined,
      category: payload.category,
      duration_weeks: payload.duration_weeks
    });
  },
  async update(id: number, payload: Partial<{ name: string; description: string; category: string; duration_weeks: number }>) {
    if (payload.category && !allowedCategories.includes(payload.category)) throw new AppError('Invalid category', 400);
    if (payload.duration_weeks !== undefined && (typeof payload.duration_weeks !== 'number' || payload.duration_weeks <= 0)) throw new AppError('duration_weeks must be a positive integer', 400);

    const updated = await programsRepository.update(id, payload as any);
    if (!updated) throw new AppError('Program not found', 404);
    return updated;
  },
  async remove(id: number) {
    const deleted = await programsRepository.delete(id);
    if (!deleted) throw new AppError('Program not found', 404);
    return true;
  }
};
