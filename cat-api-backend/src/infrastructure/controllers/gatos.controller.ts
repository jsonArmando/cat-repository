import { Request, Response, Router, NextFunction } from 'express';
import { CatService } from '../../application/services/cat.service';

export class GatosController {
  public router: Router;

  constructor(private readonly catService: CatService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/breeds', this.getAllBreeds);
    this.router.get('/breeds/search', this.searchBreeds);
    this.router.get('/breeds/:breed_id', this.getBreedById);
  }

  /**
   * Aplicamos el mismo patrón: (req, res, next) y Promise<void>
   * para asegurar la compatibilidad de tipos con Express.
   */
  private getAllBreeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const breeds = await this.catService.getAllBreeds();
      res.json(breeds);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Firma corregida para el método getBreedById.
   */
  private getBreedById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { breed_id } = req.params;
      const breed = await this.catService.getBreedById(breed_id);
      if (breed) {
        res.json(breed);
      } else {
        res.status(404).json({ message: 'Breed not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Firma corregida para el método searchBreeds, que estaba causando el error.
   */
  private searchBreeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ message: 'Query parameter "q" is required' });
        return;
      }
      const breeds = await this.catService.searchBreeds(query);
      res.json(breeds);
    } catch (error) {
      next(error);
    }
  };
}