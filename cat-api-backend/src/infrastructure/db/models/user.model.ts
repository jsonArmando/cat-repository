import { Schema, model } from 'mongoose';
import { User } from '../../../domain/entities/user.entity';

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password_hash;
    }
});


export const UserModel = model<User>('User', UserSchema);