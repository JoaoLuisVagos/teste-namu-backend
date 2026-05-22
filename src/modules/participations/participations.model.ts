import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'participations', timestamps: false, underscored: true })
export class ParticipationModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare user_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare activity_id: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare completed_at: Date;

  @Column({ type: DataType.TEXT })
  declare notes?: string;
}