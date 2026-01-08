"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongo_connection_1 = require("./infrastructure/db/mongo.connection");
// Importar Repositorios
const the_cat_api_repository_1 = require("./infrastructure/repositories/the-cat-api.repository");
const mongo_user_repository_1 = require("./infrastructure/repositories/mongo-user.repository");
// Importar Servicios
const cat_service_1 = require("./application/services/cat.service");
const auth_service_1 = require("./application/services/auth.service");
// Importar Controladores
const gatos_controller_1 = require("./infrastructure/controllers/gatos.controller");
const imagenes_controller_1 = require("./infrastructure/controllers/imagenes.controller");
const auth_controller_1 = require("./infrastructure/controllers/auth.controller");
const main = async () => {
    // Conectar a la base de datos
    await (0, mongo_connection_1.connectDB)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json()); // Middleware para parsear JSON bodies
    // --- Inyección de Dependencias ---
    // 1. Instanciar Repositorios
    const catApiRepository = new the_cat_api_repository_1.TheCatApiRepository();
    const mongoUserRepository = new mongo_user_repository_1.MongoUserRepository();
    // 2. Instanciar Servicios con sus dependencias (repositorios)
    const catService = new cat_service_1.CatService(catApiRepository);
    const authService = new auth_service_1.AuthService(mongoUserRepository);
    // 3. Instanciar Controladores con sus dependencias (servicios)
    const gatosController = new gatos_controller_1.GatosController(catService);
    const imagenesController = new imagenes_controller_1.ImagenesController(catService);
    const authController = new auth_controller_1.AuthController(authService);
    // --- Registrar Rutas ---
    app.use('/api', gatosController.router);
    app.use('/api', imagenesController.router);
    app.use('/api/users', authController.router); // Prefijo para rutas de usuario
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
main();
