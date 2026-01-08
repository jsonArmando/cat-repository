import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatBreed, CatImage } from '../../core/models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  getById(selectedBreedId: string) {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/breeds`);
  }

  getBreedById(breedId: string): Observable<CatBreed> {
    return this.http.get<CatBreed>(`${this.apiUrl}/breeds/${breedId}`);
  }

  getImagesByBreed(breedId: string): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.apiUrl}/images/by-breed?breed_id=${breedId}`);
  }
}