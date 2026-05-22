import { ParticipationModel } from './participations.model';

export const participationsRepository = {
  async findAll() {
    return ParticipationModel.findAll({ order: [['id', 'ASC']] });
  },
  async findById(id: number) {
    return ParticipationModel.findByPk(id);
  },
  async create(data: { user_name: string; activity_id: number; completed_at?: Date; notes?: string }) {
    return ParticipationModel.create(data as any);
  },
  async update(id: number, data: Partial<{ user_name: string; activity_id: number; completed_at: Date; notes: string }>) {
    const participation = await ParticipationModel.findByPk(id);
    if (!participation) return null;
    return participation.update(data as any);
  },
  async delete(id: number) {
    const participation = await ParticipationModel.findByPk(id);
    if (!participation) return false;
    await participation.destroy();
    return true;
  }
};