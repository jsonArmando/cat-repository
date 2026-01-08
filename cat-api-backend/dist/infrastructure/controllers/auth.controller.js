"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        /**
         * Maneja el registro de un nuevo usuario.
         * La firma del método ahora incluye `next: NextFunction` y el tipo de retorno `Promise<void>`
         * para coincidir perfectamente con el tipo RequestHandler de Express.
         */
        this.register = async (req, res, next) => {
            try {
                const registerDto = req.body;
                const result = await this.authService.register(registerDto);
                res.status(201).json(result);
            }
            catch (error) {
                // En lugar de manejar el error aquí, lo pasamos al middleware de errores
                next(error);
            }
        };
        /**
         * Maneja el login de un usuario existente.
         * La firma del método también se ha corregido para resolver el error de TypeScript.
         */
        this.login = async (req, res, next) => {
            try {
                const loginDto = req.body;
                const result = await this.authService.login(loginDto);
                if (!result) {
                    // Si las credenciales son inválidas, enviamos una respuesta 401 directamente.
                    // Esto no es un error del servidor, sino un fallo de autorización.
                    res.status(401).json({ message: 'Invalid credentials' });
                    return; // Detenemos la ejecución para no enviar otra respuesta.
                }
                res.json(result);
            }
            catch (error) {
                // Cualquier otro error (ej: fallo de la base de datos) se pasa al middleware
                next(error);
            }
        };
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Las rutas ahora llaman a los métodos corregidos
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }
}
exports.AuthController = AuthController;
