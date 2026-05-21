import { ProgramModel } from './program.model';

export const programsRepository = {
  async findAll() {
    return ProgramModel.findAll({ order: [['id', 'ASC']] });
  },
  async findById(id: number) {
    return ProgramModel.findByPk(id);
  },
  async create(data: { name: string; description?: string; category: string; duration_weeks: number }) {
    return ProgramModel.create(data as any);
  },
  async update(id: number, data: Partial<{ name: string; description: string; category: string; duration_weeks: number }>) {
    const program = await ProgramModel.findByPk(id);
    if (!program) return null;
    return program.update(data as any);
  },
  async delete(id: number) {
    const program = await ProgramModel.findByPk(id);
    if (!program) return false;
    await program.destroy();
    return true;
  }
};
