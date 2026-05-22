import { ProgramModel } from './program.model';
import sequelize from '../../database';
import { QueryTypes } from 'sequelize';

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
  },
  async summary(programId: number) {
    const [totals] = await sequelize.query<{ total_activities: number; total_participations: number }>(
      `
        SELECT
          (SELECT COUNT(*) FROM activities WHERE program_id = :programId) AS total_activities,
          (SELECT COUNT(*)
           FROM participations p
           INNER JOIN activities a ON a.id = p.activity_id
           WHERE a.program_id = :programId) AS total_participations
      `,
      {
        replacements: { programId },
        type: QueryTypes.SELECT
      }
    );

    const topParticipants = await sequelize.query<{ user_name: string; total_participations: number }>(
      `
        SELECT
          p.user_name,
          COUNT(*) AS total_participations
        FROM participations p
        INNER JOIN activities a ON a.id = p.activity_id
        WHERE a.program_id = :programId
        GROUP BY p.user_name
        ORDER BY total_participations DESC, p.user_name ASC
        LIMIT 5
      `,
      {
        replacements: { programId },
        type: QueryTypes.SELECT
      }
    );

    return {
      total_activities: Number(totals?.total_activities ?? 0),
      total_participations: Number(totals?.total_participations ?? 0),
      top_participants: topParticipants
    };
  }
};
