import { AppError } from '../../shared/errors/app-error';
import { programsRepository } from './programs.repository';

const allowedCategories = ['meditacao', 'exercicio', 'nutricao'];

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export const programsService = {
  async list() {
    return programsRepository.findAll();
  },
  async get(id: number) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const program = await programsRepository.findById(id);
    if (!program) throw new AppError('Program not found', 404);
    return program;
  },
  async create(payload: { name?: string; description?: string; category?: string; duration_weeks?: number }) {
    if (!payload.name || !payload.name.trim()) throw new AppError('name is required', 400);
    if (!payload.category || !allowedCategories.includes(payload.category)) throw new AppError('Invalid category', 400);
    const durationWeeks = payload.duration_weeks;
    if (!isPositiveInteger(durationWeeks)) throw new AppError('duration_weeks must be a positive integer', 400);

    return programsRepository.create({
      name: payload.name.trim(),
      description: payload.description ?? undefined,
      category: payload.category,
      duration_weeks: durationWeeks
    });
  },
  async update(id: number, payload: Partial<{ name: string; description: string; category: string; duration_weeks: number }>) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    if (payload.name !== undefined && !payload.name.trim()) throw new AppError('name is required', 400);
    if (payload.category && !allowedCategories.includes(payload.category)) throw new AppError('Invalid category', 400);
    if (payload.duration_weeks !== undefined && !isPositiveInteger(payload.duration_weeks)) throw new AppError('duration_weeks must be a positive integer', 400);

    const updated = await programsRepository.update(id, payload as any);
    if (!updated) throw new AppError('Program not found', 404);
    return updated;
  },
  async summary(id: number) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const program = await programsRepository.findById(id);
    if (!program) throw new AppError('Program not found', 404);
    return programsRepository.summary(id);
  },
  async remove(id: number) {
    if (!isPositiveInteger(id)) throw new AppError('Invalid id', 400);
    const deleted = await programsRepository.delete(id);
    if (!deleted) throw new AppError('Program not found', 404);
    return true;
  }
};
