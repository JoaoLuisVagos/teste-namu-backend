import { programsService } from '../../src/modules/programs/programs.service';
import { AppError } from '../../src/shared/errors/app-error';

describe('Programs Service - validation', () => {
  it('should reject missing name', async () => {
    await expect(programsService.create({ category: 'meditacao', duration_weeks: 4 } as any)).rejects.toBeInstanceOf(AppError);
  });

  it('should reject invalid category', async () => {
    await expect(programsService.create({ name: 'x', category: 'invalid', duration_weeks: 4 } as any)).rejects.toBeInstanceOf(AppError);
  });

  it('should reject non-positive duration', async () => {
    await expect(programsService.create({ name: 'x', category: 'meditacao', duration_weeks: 0 } as any)).rejects.toBeInstanceOf(AppError);
  });
});
