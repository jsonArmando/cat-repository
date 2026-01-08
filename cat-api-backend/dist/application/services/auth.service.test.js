"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const bcrypt = __importStar(require("bcryptjs"));
// Mock del repositorio
const mockUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
};
// Mock de bcrypt
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt;
describe('AuthService', () => {
    let authService;
    beforeEach(() => {
        // Reset mocks antes de cada prueba
        jest.clearAllMocks();
        authService = new auth_service_1.AuthService(mockUserRepository);
        process.env.JWT_SECRET = 'test-secret'; // Definir para la prueba
    });
    describe('register', () => {
        it('should register a new user successfully', async () => {
            // Arrange
            const registerDto = { name: 'Test User', email: 'test@example.com', password_raw: 'password123' };
            const hashedPassword = 'hashed_password';
            const savedUser = { id: '1', name: 'Test User', email: 'test@example.com', password_hash: hashedPassword };
            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue(hashedPassword);
            mockUserRepository.save.mockResolvedValue(savedUser);
            // Act
            const result = await authService.register(registerDto);
            // Assert
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(registerDto.email);
            expect(mockedBcrypt.hash).toHaveBeenCalledWith(registerDto.password_raw, 10);
            expect(mockUserRepository.save).toHaveBeenCalledWith({
                name: registerDto.name,
                email: registerDto.email,
                password_hash: hashedPassword,
            });
            expect(result.user).toEqual(expect.objectContaining({ id: '1', name: 'Test User' }));
            expect(result.token).toBeDefined();
        });
        it('should throw an error if user already exists', async () => {
            // Arrange
            const registerDto = { name: 'Test User', email: 'test@example.com', password_raw: 'password123' };
            mockUserRepository.findByEmail.mockResolvedValue({ id: '1', name: 'Existing User', email: 'test@example.com', password_hash: '...' });
            // Act & Assert
            await expect(authService.register(registerDto)).rejects.toThrow('User with this email already exists');
        });
    });
});
