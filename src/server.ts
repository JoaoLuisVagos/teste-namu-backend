import 'dotenv/config';
import express from 'express';
import routes from './routes';
import sequelize from './database';

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT ?? 3000;

async function bootstrap() {
	await sequelize.authenticate();
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

void bootstrap();

export default app;
