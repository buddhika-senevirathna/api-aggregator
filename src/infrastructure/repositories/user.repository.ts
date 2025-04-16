import { injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/iUserRepository";
import { User } from "../../models/user.model";
import UserModel from "../../schemas/user.schema";
import { UserMapper } from "../../mappings/user.mapper";

const mapper = new UserMapper();

@injectable()
export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const users = await UserModel.find().lean();
    return users.map(user => (mapper.mapToModelUser(user)));
  }

  async create(name: string): Promise<User> {
    const user = new UserModel({ name });
    await user.save();
    return mapper.mapToModelUser(user);
  }
}
