import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ProgramModel } from '../programs/program.model';

@Table({ tableName: 'activities', timestamps: false, underscored: true })
export class ActivityModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => ProgramModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare program_id: number;

  @BelongsTo(() => ProgramModel)
  declare program?: ProgramModel;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare description?: string;

  @Column({ type: DataType.ENUM('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'), allowNull: false })
  declare day_of_week: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare duration_minutes: number;
}