import express from 'express';
import cors from 'cors'; 
import 'dotenv/config';
import { connectDB } from './infrastructure/db/mongo.connection';

import { TheCatApiRepository } from './infrastructure/repositories/the-cat-api.repository';
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import { CatService } from './application/services/cat.service';
import { AuthService } from './application/services/auth.service';
import { GatosController } from './infrastructure/controllers/gatos.controller';
import { ImagenesController } from './infrastructure/controllers/imagenes.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';

const main = async () => {
  await connectDB();

  const app = express();
  
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  const catApiRepository = new TheCatApiRepository();
  const mongoUserRepository = new MongoUserRepository();
  const catService = new CatService(catApiRepository);
  const authService = new AuthService(mongoUserRepository);
  const gatosController = new GatosController(catService);
  const imagenesController = new ImagenesController(catService);
  const authController = new AuthController(authService);
  app.use('/api', gatosController.router);
  app.use('/api', imagenesController.router);
  app.use('/api/users', authController.router);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();