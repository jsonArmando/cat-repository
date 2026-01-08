import { Request, Response, Router, NextFunction } from 'express';
import { CatService } from '../../application/services/cat.service';

export class ImagenesController {
  public router: Router;

  constructor(private readonly catService: CatService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/images/by-breed', this.getImagesByBreedId);
  }

  /**
   * Firma corregida para el método getImagesByBreedId.
   */
  private getImagesByBreedId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const breedId = req.query.breed_id as string;
      if (!breedId) {
        res.status(400).json({ message: 'Query parameter "breed_id" is required' });
        return;
      }
      const images = await this.catService.getImagesByBreed(breedId);
      res.json(images);
    } catch (error) {
      next(error);
    }
  };
}