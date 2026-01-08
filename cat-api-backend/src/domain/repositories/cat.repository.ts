import { CatBreed, CatImage } from '../entities/cat.entity';

// Interfaz que define las operaciones que podemos hacer relacionadas con gatos.
// La aplicación dependerá de esta abstracción, no de una implementación concreta.
export interface ICatRepository {
  findAllBreeds(): Promise<CatBreed[]>;
  findBreedById(breedId: string): Promise<CatBreed | null>;
  searchBreeds(query: string): Promise<CatBreed[]>;
  findImagesByBreed(breedId: string): Promise<CatImage[]>;
}