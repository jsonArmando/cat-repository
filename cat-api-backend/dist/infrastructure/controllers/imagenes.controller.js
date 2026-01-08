"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesController = void 0;
const express_1 = require("express");
class ImagenesController {
    constructor(catService) {
        this.catService = catService;
        /**
         * Firma corregida para el método getImagesByBreedId.
         */
        this.getImagesByBreedId = async (req, res, next) => {
            try {
                const breedId = req.query.breed_id;
                if (!breedId) {
                    // Error del cliente (Bad Request)
                    res.status(400).json({ message: 'Query parameter "breed_id" is required' });
                    return;
                }
                const images = await this.catService.getImagesByBreed(breedId);
                res.json(images);
            }
            catch (error) {
                // Cualquier otro error se pasa al manejador centralizado
                next(error);
            }
        };
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // La ruta que estaba causando el error
        this.router.get('/images/by-breed', this.getImagesByBreedId);
    }
}
exports.ImagenesController = ImagenesController;
