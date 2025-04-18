import { User, Credentials } from "../models/user.model";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    create(name: string, email:string): Promise<User>;
    createUserWithCredentials(userId: string, provider: string, credentials: string): Promise<User>;
    getCredentialsByUserId(id: string, provider:string): Promise<Credentials | null>;
}
