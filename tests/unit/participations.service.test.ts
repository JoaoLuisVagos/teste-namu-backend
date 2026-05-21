import { participationsService } from '../../src/modules/participations/participations.service';
import { AppError } from '../../src/shared/errors/app-error';

describe('Participations Service - validation', () => {
  it('should reject missing user_name', async () => {
    await expect(participationsService.create({ activity_id: 1 } as any)).rejects.toBeInstanceOf(AppError);
  });

  it('should reject non-positive activity_id', async () => {
    await expect(participationsService.create({ user_name: 'x', activity_id: 0 } as any)).rejects.toBeInstanceOf(AppError);
  });
});

describe('Participations Service - update validation', () => {
  it('should reject non-positive activity_id on update', async () => {
    const participation = await participationsService.create({ user_name: 'Test User', activity_id: 1 });
    
    await expect(participationsService.update(participation.id, { activity_id: -1 })).rejects.toBeInstanceOf(AppError);
  });
});