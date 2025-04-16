import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../interfaces/iUserRepository";
import { User } from "../../models/user.model";

@injectable()
export class UserService {
    constructor(@inject("IUserRepository") private readonly repo: IUserRepository) {}

    getUsers(): Promise<User[]> {
        return this.repo.getAll();
    }

    createUser(name: string): Promise<User> {
        return this.repo.create(name);
    }
}
