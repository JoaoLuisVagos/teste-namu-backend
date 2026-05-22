jest.mock('../../src/modules/programs/programs.repository', () => ({
  programsRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

const { programsService } = require('../../src/modules/programs/programs.service');
const { AppError } = require('../../src/shared/errors/app-error');
const { programsRepository } = require('../../src/modules/programs/programs.repository');

const mockedProgramsRepository = programsRepository as jest.Mocked<typeof programsRepository>;

beforeEach(() => {
  jest.clearAllMocks();
  mockedProgramsRepository.create.mockResolvedValue({ id: 1, name: 'Test Program', category: 'meditacao', duration_weeks: 4 } as any);
});

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

describe('Programs Service - update validation', () => {
  it('should reject invalid category on update', async () => {
    const program = await programsService.create({ name: 'Test Program', category: 'meditacao', duration_weeks: 4 });
    
    await expect(programsService.update(program.id, { category: 'invalid' })).rejects.toBeInstanceOf(AppError);
  });

  it('should reject non-positive duration on update', async () => {
    const program = await programsService.create({ name: 'Test Program', category: 'meditacao', duration_weeks: 4 });
    
    await expect(programsService.update(program.id, { duration_weeks: -1 })).rejects.toBeInstanceOf(AppError);
  });
});

export {};
