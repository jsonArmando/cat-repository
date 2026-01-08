"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const user_model_1 = require("../db/models/user.model");
class MongoUserRepository {
    async findByEmail(email) {
        const user = await user_model_1.UserModel.findOne({ email }).lean();
        if (!user)
            return null;
        return { ...user, id: user._id.toString() };
    }
    async save(user) {
        const newUser = new user_model_1.UserModel(user);
        await newUser.save();
        return { ...newUser.toObject(), id: newUser._id.toString() };
    }
}
exports.MongoUserRepository = MongoUserRepository;
