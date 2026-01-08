import { ICatRepository } from '../../domain/repositories/cat.repository';
import { CatBreed, CatImage } from '../../domain/entities/cat.entity';
import theCatApiClient from '../external/the-cat-api.client';

// Implementación concreta del repositorio de gatos usando TheCatAPI.
// Esta clase sabe cómo "hablar" el idioma de la API externa.
export class TheCatApiRepository implements ICatRepository {
  async findAllBreeds(): Promise<CatBreed[]> {
    const { data } = await theCatApiClient.get<CatBreed[]>('/breeds');
    return data;
  }

  async findBreedById(breedId: string): Promise<CatBreed | null> {
    const { data } = await theCatApiClient.get<CatBreed[]>(`/breeds/search?q=${breedId}`);
    return data.length > 0 ? data[0] : null;
  }

  async searchBreeds(query: string): Promise<CatBreed[]> {
    const { data } = await theCatApiClient.get<CatBreed[]>(`/breeds/search?q=${query}`);
    return data;
  }

  async findImagesByBreed(breedId: string): Promise<CatImage[]> {
    const { data } = await theCatApiClient.get<CatImage[]>(`/images/search?breed_ids=${breedId}&limit=10`);
    return data;
  }
}