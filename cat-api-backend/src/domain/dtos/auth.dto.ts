import { User } from "../entities/user.entity";

// DTOs para los datos que entran y salen del sistema.
export type RegisterUserDto = Pick<User, 'name' | 'email'> & { password_raw: string };
export type LoginUserDto = Pick<User, 'email'> & { password_raw: string };