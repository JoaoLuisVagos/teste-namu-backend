import { ActivityModel } from './activity.model';

export const activitiesRepository = {
  async findAllByProgram(programId: number) {
    return ActivityModel.findAll({ where: { program_id: programId }, order: [['id', 'ASC']] });
  },
  async findById(programId: number, id: number) {
    return ActivityModel.findOne({ where: { id, program_id: programId } });
  },
  async findByIdOnly(id: number) {
    return ActivityModel.findByPk(id);
  },
  async create(programId: number, data: { title: string; description?: string; day_of_week: string; duration_minutes: number }) {
    return ActivityModel.create({ program_id: programId, ...data } as any);
  },
  async update(programId: number, id: number, data: Partial<{ title: string; description: string; day_of_week: string; duration_minutes: number }>) {
    const activity = await ActivityModel.findOne({ where: { id, program_id: programId } });
    if (!activity) return null;
    return activity.update(data as any);
  },
  async delete(programId: number, id: number) {
    const activity = await ActivityModel.findOne({ where: { id, program_id: programId } });
    if (!activity) return false;
    await activity.destroy();
    return true;
  }
};