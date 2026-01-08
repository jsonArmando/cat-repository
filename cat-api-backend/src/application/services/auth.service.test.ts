import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from './auth.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(mockUserRepository);
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = { name: 'Test User', email: 'test@example.com', password_raw: 'password123' };
      
      const mockSalt = 'a_mocked_salt';
      const hashedPassword = 'hashed_password';
      const savedUser: User = { id: '1', name: 'Test User', email: 'test@example.com', password_hash: hashedPassword };
  
      mockUserRepository.findByEmail.mockResolvedValue(null);
      
      mockedBcrypt.genSalt.mockResolvedValue(mockSalt as never);
      
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);
      
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await authService.register(registerDto);


      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(registerDto.email);
      
      expect(mockedBcrypt.genSalt).toHaveBeenCalledWith(10);
      
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(registerDto.password_raw, mockSalt);
      
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        name: registerDto.name,
        email: registerDto.email,
        password_hash: hashedPassword,
      });
      
      expect(result.user).toEqual(expect.objectContaining({ id: '1' }));
      expect(result.token).toBeDefined();
    });

    it('should throw an error if user already exists', async () => {
        const registerDto = { name: 'Test User', email: 'test@example.com', password_raw: 'password123' };
        mockUserRepository.findByEmail.mockResolvedValue({ id: '1', name: 'Existing User', email: 'test@example.com', password_hash: '...' });
        await expect(authService.register(registerDto)).rejects.toThrow('User with this email already exists');
    });
  });
});