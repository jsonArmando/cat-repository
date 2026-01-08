"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheCatApiRepository = void 0;
const the_cat_api_client_1 = __importDefault(require("../external/the-cat-api.client"));
// Implementación concreta del repositorio de gatos usando TheCatAPI.
// Esta clase sabe cómo "hablar" el idioma de la API externa.
class TheCatApiRepository {
    async findAllBreeds() {
        const { data } = await the_cat_api_client_1.default.get('/breeds');
        return data;
    }
    async findBreedById(breedId) {
        // La API no tiene un endpoint directo para /breeds/:id,
        // pero podemos obtener todas y filtrar. O usar el de búsqueda si fuera más eficiente.
        const { data } = await the_cat_api_client_1.default.get(`/breeds/search?q=${breedId}`);
        return data.length > 0 ? data[0] : null;
    }
    async searchBreeds(query) {
        const { data } = await the_cat_api_client_1.default.get(`/breeds/search?q=${query}`);
        return data;
    }
    async findImagesByBreed(breedId) {
        const { data } = await the_cat_api_client_1.default.get(`/images/search?breed_ids=${breedId}&limit=10`);
        return data;
    }
}
exports.TheCatApiRepository = TheCatApiRepository;
