"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatService = void 0;
// Este servicio orquesta las operaciones. Recibe el repositorio por inyección de dependencias.
// Cumple con el Principio de Inversión de Dependencias (SOLID).
class CatService {
    constructor(catRepository) {
        this.catRepository = catRepository;
    }
    async getAllBreeds() {
        return this.catRepository.findAllBreeds();
    }
    async getBreedById(id) {
        return this.catRepository.findBreedById(id);
    }
    async searchBreeds(query) {
        return this.catRepository.searchBreeds(query);
    }
    async getImagesByBreed(breedId) {
        return this.catRepository.findImagesByBreed(breedId);
    }
}
exports.CatService = CatService;
