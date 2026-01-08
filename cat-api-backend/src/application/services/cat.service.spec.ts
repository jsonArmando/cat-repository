import { CatService } from './cat.service';
import { ICatRepository } from '../../domain/repositories/cat.repository';
import { CatBreed, CatImage } from '../../domain/entities/cat.entity';

describe('CatService', () => {
    let catService: CatService;
    let mockCatRepository: jest.Mocked<ICatRepository>;

    beforeEach(() => {
        mockCatRepository = {
            findAllBreeds: jest.fn(),
            findBreedById: jest.fn(),
            searchBreeds: jest.fn(),
            findImagesByBreed: jest.fn(),
        };
        catService = new CatService(mockCatRepository);
    });

    describe('getAllBreeds', () => {
        it('should return a list of breeds', async () => {
            const mockBreeds: CatBreed[] = [
                { id: 'abys', name: 'Abyssinian', origin: 'Egypt', temperament: 'Active', description: 'Desc' },
                { id: 'beng', name: 'Bengal', origin: 'US', temperament: 'Wild', description: 'Desc' },
            ];
            mockCatRepository.findAllBreeds.mockResolvedValue(mockBreeds);

            const result = await catService.getAllBreeds();

            expect(result).toEqual(mockBreeds);
            expect(mockCatRepository.findAllBreeds).toHaveBeenCalledTimes(1);
        });
    });

    describe('getBreedById', () => {
        it('should return a specific breed by ID', async () => {
            const mockBreed: CatBreed = { id: 'abys', name: 'Abyssinian', origin: 'Egypt', temperament: 'Active', description: 'Desc' };
            mockCatRepository.findBreedById.mockResolvedValue(mockBreed);

            const result = await catService.getBreedById('abys');

            expect(result).toEqual(mockBreed);
            expect(mockCatRepository.findBreedById).toHaveBeenCalledWith('abys');
        });

        it('should return null if breed not found', async () => {
            mockCatRepository.findBreedById.mockResolvedValue(null);

            const result = await catService.getBreedById('unknown');

            expect(result).toBeNull();
        });
    });

    describe('searchBreeds', () => {
        it('should return breeds matching the query', async () => {
            const mockBreeds: CatBreed[] = [{ id: 'beng', name: 'Bengal', origin: 'US', temperament: 'Wild', description: 'Desc' }];
            mockCatRepository.searchBreeds.mockResolvedValue(mockBreeds);

            const result = await catService.searchBreeds('ben');

            expect(result).toEqual(mockBreeds);
            expect(mockCatRepository.searchBreeds).toHaveBeenCalledWith('ben');
        });
    });

    describe('getImagesByBreed', () => {
        it('should return images for a breed', async () => {
            const mockImages: CatImage[] = [{ id: 'img1', url: 'http://image.url/1.jpg' }];
            mockCatRepository.findImagesByBreed.mockResolvedValue(mockImages);

            const result = await catService.getImagesByBreed('abys');

            expect(result).toEqual(mockImages);
            expect(mockCatRepository.findImagesByBreed).toHaveBeenCalledWith('abys');
        });
    });
});
