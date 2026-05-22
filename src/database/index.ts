import { Sequelize } from 'sequelize-typescript';
import { ActivityModel } from '../modules/activities/activity.model';
import { ProgramModel } from '../modules/programs/program.model';
import { ParticipationModel } from '../modules/participations/participations.model';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'namu_wellness',
  models: [ProgramModel, ActivityModel, ParticipationModel]
});

export default sequelize;
