jest.mock('../../src/modules/participations/participations.repository', () => ({
  participationsRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

jest.mock('../../src/modules/activities/activities.repository', () => ({
  activitiesRepository: {
    findByIdOnly: jest.fn()
  }
}));

const { participationsService } = require('../../src/modules/participations/participations.service');
const { AppError } = require('../../src/shared/errors/app-error');
const { participationsRepository } = require('../../src/modules/participations/participations.repository');
const { activitiesRepository } = require('../../src/modules/activities/activities.repository');

const mockedParticipationsRepository = participationsRepository as jest.Mocked<typeof participationsRepository>;
const mockedActivitiesRepository = activitiesRepository as jest.Mocked<typeof activitiesRepository>;

beforeEach(() => {
  jest.clearAllMocks();
  mockedParticipationsRepository.create.mockResolvedValue({ id: 1, user_name: 'Test User', activity_id: 1 } as any);
  mockedActivitiesRepository.findByIdOnly.mockResolvedValue({ id: 1 } as any);
});

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

export {};