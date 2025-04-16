import { User } from "../models/user.model";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    create(name: string): Promise<User>;
}
