import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserModel } from '../db/models/user.model';

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return null;
    return { ...user, id: user._id.toString() };
  }

  async save(user: Omit<User, 'id'>): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return { ...newUser.toObject(), id: newUser._id.toString() };
  }
}