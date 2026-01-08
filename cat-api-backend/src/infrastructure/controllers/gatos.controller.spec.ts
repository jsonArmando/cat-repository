import { Request, Response } from 'express';
import { GatosController } from './gatos.controller';
import { CatService } from '../../application/services/cat.service';
import { CatBreed } from '../../domain/entities/cat.entity';

// Mock del CatService
jest.mock('../../application/services/cat.service');

describe('GatosController', () => {
    let gatosController: GatosController;
    let mockCatService: jest.Mocked<CatService>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        // Limpiar mocks antes de cada test
        mockCatService = new CatService({} as any) as jest.Mocked<CatService>;
        gatosController = new GatosController(mockCatService);

        // Mocks básicos de Express
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    describe('getAllBreeds', () => {
        it('should return a list of breeds', async () => {
            const mockBreeds: CatBreed[] = [{ id: 'beng', name: 'Bengal', origin: 'US', temperament: '', description: '' }];
            mockCatService.getAllBreeds.mockResolvedValue(mockBreeds);

            // Invocamos el método privado a través de 'any' para testearlo o modificar el controller para hacerlo público si fuera necesario
            // En este caso, como los métodos están vinculados a rutas, lo ideal es supertest o exponerlos.
            // Dado que son private, accederemos via (gatosController as any).getAllBreeds
            await (gatosController as any).getAllBreeds(req as Request, res as Response, next);

            expect(mockCatService.getAllBreeds).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockBreeds);
        });
    });

    describe('getBreedById', () => {
        it('should return a breed if found', async () => {
            req.params = { breed_id: 'beng' };
            const mockBreed = { id: 'beng', name: 'Bengal', origin: 'US', temperament: '', description: '' };
            mockCatService.getBreedById.mockResolvedValue(mockBreed);

            await (gatosController as any).getBreedById(req as Request, res as Response, next);

            expect(mockCatService.getBreedById).toHaveBeenCalledWith('beng');
            expect(res.json).toHaveBeenCalledWith(mockBreed);
        });

        it('should return 404 if breed not found', async () => {
            req.params = { breed_id: 'unknown' };
            mockCatService.getBreedById.mockResolvedValue(null);

            await (gatosController as any).getBreedById(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Breed not found' });
        });
    });

    describe('searchBreeds', () => {
        it('should return breeds matching query', async () => {
            req.query = { q: 'ben' };
            const mockBreeds: CatBreed[] = [{ id: 'beng', name: 'Bengal', origin: 'US', temperament: '', description: '' }];
            mockCatService.searchBreeds.mockResolvedValue(mockBreeds);

            await (gatosController as any).searchBreeds(req as Request, res as Response, next);

            expect(mockCatService.searchBreeds).toHaveBeenCalledWith('ben');
            expect(res.json).toHaveBeenCalledWith(mockBreeds);
        });

        it('should return 400 if query param is missing', async () => {
            req.query = {}; // Missing q

            await (gatosController as any).searchBreeds(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('required') }));
        });
    });
});
