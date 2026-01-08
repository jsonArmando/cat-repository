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
exports.AuthService = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET;
        if (!this.jwtSecret) {
            throw new Error('JWT_SECRET must be defined in .env file');
        }
    }
    async register(registerDto) {
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
    async login(loginDto) {
        const { email, password_raw } = loginDto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null; // Usuario no encontrado
        }
        const isMatch = await bcrypt.compare(password_raw, user.password_hash);
        if (!isMatch) {
            return null; // Contraseña incorrecta
        }
        const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, { expiresIn: '1h' });
        return { user, token };
    }
}
exports.AuthService = AuthService;
