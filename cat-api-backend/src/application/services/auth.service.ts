import { IUserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserDto, LoginUserDto } from '../../domain/dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthService {
  private readonly jwtSecret: string;

  constructor(private readonly userRepository: IUserRepository) {
    this.jwtSecret = process.env.JWT_SECRET!;
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET must be defined in .env file');
    }
  }

  async register(registerDto: RegisterUserDto): Promise<{ user: any; token: string }> {
    const { name, email, password_raw } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password_raw, salt);

    const newUser = await this.userRepository.save({ name, email, password_hash });
    
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, this.jwtSecret, { expiresIn: '1h' });

    return { user: newUser, token };
  }

  async login(loginDto: LoginUserDto): Promise<{ user: any; token: string } | null> {
    const { email, password_raw } = loginDto;
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password_raw, user.password_hash);
    if (!isMatch) {
      return null;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, { expiresIn: '1h' });

    return { user, token };
  }
}