import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'programs', timestamps: true, underscored: true })
export class ProgramModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare description?: string;

  @Column({ type: DataType.ENUM('meditacao','exercicio','nutricao'), allowNull: false })
  declare category: 'meditacao' | 'exercicio' | 'nutricao';

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare duration_weeks: number;
}
