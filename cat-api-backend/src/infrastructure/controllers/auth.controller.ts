import { Request, Response, Router, NextFunction } from 'express';
import { AuthService } from '../../application/services/auth.service';
import { RegisterUserDto, LoginUserDto } from '../../domain/dtos/auth.dto';

export class AuthController {
  public router: Router;

  constructor(private readonly authService: AuthService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }

  /**
   * Maneja el registro de un nuevo usuario.
   * La firma del método ahora incluye `next: NextFunction` y el tipo de retorno `Promise<void>`
   * para coincidir perfectamente con el tipo RequestHandler de Express.
   */
  private register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerDto: RegisterUserDto = req.body;
      const result = await this.authService.register(registerDto);
      res.status(201).json(result);
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Maneja el login de un usuario existente.
   * La firma del método también se ha corregido para resolver el error de TypeScript.
   */
  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginDto: LoginUserDto = req.body;
      const result = await this.authService.login(loginDto);

      if (!result) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.json(result);
    } catch (error: any) {
      next(error);
    }
  };
}