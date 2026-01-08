import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedsExplorerComponent } from './breeds-explorer.component';
import { CatApiService } from '../../infrastructure/services/cat-api.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

describe('BreedsExplorerComponent', () => {
    let component: BreedsExplorerComponent;
    let fixture: ComponentFixture<BreedsExplorerComponent>;
    let mockCatApiService: any;

    beforeEach(async () => {
        mockCatApiService = {
            getAllBreeds: jasmine.createSpy('getAllBreeds').and.returnValue(of([])),
            getBreedById: jasmine.createSpy('getBreedById').and.returnValue(of({})),
            getImagesByBreed: jasmine.createSpy('getImagesByBreed').and.returnValue(of([]))
        };

        await TestBed.configureTestingModule({
            imports: [
                BreedsExplorerComponent,
                BrowserAnimationsModule, // Required for Material components
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                MatTableModule
            ],
            providers: [
                { provide: CatApiService, useValue: mockCatApiService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BreedsExplorerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load breeds on init', () => {
        const mockBreeds = [{ id: '1', name: 'Test Breed' }];
        mockCatApiService.getAllBreeds.and.returnValue(of(mockBreeds));

        component.ngOnInit();

        expect(mockCatApiService.getAllBreeds).toHaveBeenCalled();
    });

    describe('Carousel Logic', () => {
        it('should initialize index at 0', () => {
            expect(component.currentImageIndex).toBe(0);
        });

        it('should increment index on nextImage()', () => {
            component.selectedBreedImages = [{ id: '1', url: 'a' }, { id: '2', url: 'b' }] as any;
            component.currentImageIndex = 0;

            component.nextImage();

            expect(component.currentImageIndex).toBe(1);
        });

        it('should loop back to 0 on nextImage() at end', () => {
            component.selectedBreedImages = [{ id: '1', url: 'a' }, { id: '2', url: 'b' }] as any;
            component.currentImageIndex = 1;

            component.nextImage();

            expect(component.currentImageIndex).toBe(0);
        });

        it('should decrement index on previousImage()', () => {
            component.selectedBreedImages = [{ id: '1', url: 'a' }, { id: '2', url: 'b' }] as any;
            component.currentImageIndex = 1;

            component.previousImage();

            expect(component.currentImageIndex).toBe(0);
        });

        it('should loop to last index on previousImage() at start', () => {
            component.selectedBreedImages = [{ id: '1', url: 'a' }, { id: '2', url: 'b' }] as any;
            component.currentImageIndex = 0;

            component.previousImage();

            expect(component.currentImageIndex).toBe(1);
        });
    });
});
