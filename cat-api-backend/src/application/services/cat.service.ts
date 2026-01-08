import { ICatRepository } from '../../domain/repositories/cat.repository';

// Este servicio orquesta las operaciones. Recibe el repositorio por inyección de dependencias.
// Cumple con el Principio de Inversión de Dependencias (SOLID).
export class CatService {
  constructor(private readonly catRepository: ICatRepository) {}

  async getAllBreeds() {
    return this.catRepository.findAllBreeds();
  }

  async getBreedById(id: string) {
    return this.catRepository.findBreedById(id);
  }

  async searchBreeds(query: string) {
    return this.catRepository.searchBreeds(query);
  }

  async getImagesByBreed(breedId: string) {
    return this.catRepository.findImagesByBreed(breedId);
  }
}