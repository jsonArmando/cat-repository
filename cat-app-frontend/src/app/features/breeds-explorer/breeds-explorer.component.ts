import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, catchError, of } from 'rxjs';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { CatApiService } from '../../infrastructure/services/cat-api.service';
import { CatBreed, CatImage } from '../../core/models/breed.model';

@Component({
  selector: 'app-breeds-explorer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  templateUrl: './breeds-explorer.component.html',
  styleUrls: ['./breeds-explorer.component.scss']
})
export class BreedsExplorerComponent implements OnInit, AfterViewInit {
  breeds: CatBreed[] = [];
  tableDataSource = new MatTableDataSource<CatBreed>();
  selectedBreedInfo: CatBreed | null = null;
  selectedBreedImages: CatImage[] = [];
  currentImageIndex: number = 0;

  isLoadingBreeds = false;
  isLoadingDetails = false;
  errorMessage: string | null = null; // Para el mensaje de error 404

  selectedBreedId: string | null = null;
  searchTerm: string = '';

  displayedColumns: string[] = ['name', 'origin', 'temperament'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private catApiService: CatApiService) { }

  ngOnInit(): void {
    this.isLoadingBreeds = true;
    this.catApiService.getAllBreeds()
      .pipe(finalize(() => this.isLoadingBreeds = false))
      .subscribe(data => {
        this.breeds = data;
        this.tableDataSource.data = data; // Asignamos los datos al MatTableDataSource
      });
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  onBreedSelected(breedId?: string): void {
    const idToFetch = breedId || this.selectedBreedId;
    if (!idToFetch) return;

    this.selectedBreedId = idToFetch;
    this.isLoadingDetails = true;
    this.selectedBreedInfo = null;
    this.selectedBreedImages = [];
    this.errorMessage = null; // Limpiamos cualquier error anterior
    this.currentImageIndex = 0; // Reset carousel index

    this.catApiService.getBreedById(idToFetch).pipe(
      catchError(error => {
        console.error('Error fetching breed details:', error);
        this.errorMessage = `No se encontró la raza solicitada (ID: ${idToFetch}). Por favor, intenta con otra.`;
        this.isLoadingDetails = false;
        return of(null); // Retornamos un observable nulo para que el flujo no se rompa
      })
    ).subscribe(info => {
      if (info) {
        this.selectedBreedInfo = info;
      }
    });

    this.catApiService.getImagesByBreed(idToFetch)
      .pipe(finalize(() => this.isLoadingDetails = false))
      .subscribe(images => {
        this.selectedBreedImages = images;
      });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.tableDataSource.filter = filterValue;

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  // Carousel Logic
  previousImage(): void {
    if (this.selectedBreedImages.length === 0) return;
    this.currentImageIndex = (this.currentImageIndex > 0)
      ? this.currentImageIndex - 1
      : this.selectedBreedImages.length - 1;
  }

  nextImage(): void {
    if (this.selectedBreedImages.length === 0) return;
    this.currentImageIndex = (this.currentImageIndex < this.selectedBreedImages.length - 1)
      ? this.currentImageIndex + 1
      : 0;
  }
}
