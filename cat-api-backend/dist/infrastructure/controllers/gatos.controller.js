"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatosController = void 0;
const express_1 = require("express");
class GatosController {
    constructor(catService) {
        this.catService = catService;
        /**
         * Aplicamos el mismo patrón: (req, res, next) y Promise<void>
         * para asegurar la compatibilidad de tipos con Express.
         */
        this.getAllBreeds = async (req, res, next) => {
            try {
                const breeds = await this.catService.getAllBreeds();
                res.json(breeds);
            }
            catch (error) {
                // Pasamos cualquier error al manejador centralizado
                next(error);
            }
        };
        /**
         * Firma corregida para el método getBreedById.
         */
        this.getBreedById = async (req, res, next) => {
            try {
                const { breed_id } = req.params;
                const breed = await this.catService.getBreedById(breed_id);
                if (breed) {
                    res.json(breed);
                }
                else {
                    // Esto no es un error de servidor, es un "No Encontrado"
                    res.status(404).json({ message: 'Breed not found' });
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Firma corregida para el método searchBreeds, que estaba causando el error.
         */
        this.searchBreeds = async (req, res, next) => {
            try {
                const query = req.query.q;
                if (!query) {
                    // Esto es un error del cliente (Bad Request)
                    res.status(400).json({ message: 'Query parameter "q" is required' });
                    return;
                }
                const breeds = await this.catService.searchBreeds(query);
                res.json(breeds);
            }
            catch (error) {
                next(error);
            }
        };
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/breeds', this.getAllBreeds);
        this.router.get('/breeds/search', this.searchBreeds);
        this.router.get('/breeds/:breed_id', this.getBreedById);
    }
}
exports.GatosController = GatosController;
