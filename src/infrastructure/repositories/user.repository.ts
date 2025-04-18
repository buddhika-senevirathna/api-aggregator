import { injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/iUserRepository";
import { Credentials, User } from "../../models/user.model";
import UserModel from "../../schemas/user.schema";
import { UserMapper } from "../../mappings/user.mapper";
import { PrismaClient } from "@prisma/client";

const mapper = new UserMapper();
const prisma = new PrismaClient();

@injectable()
export class UserRepository implements IUserRepository {
  async getAll(): Promise<any[]> {
    return await prisma.user.findMany();
  }

  async create(name: string, email:string): Promise<any> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return user
  }
  async createUserWithCredentials(userId: string, provider: string, credentials: string): Promise<any> {
    const user = await prisma.credentials.create({
      data: {
        userId,
        provider,
        credentials,
      },
    });
    return user;
  }

  async getCredentialsByUserId(id: string, provider:string): Promise<Credentials | null> {
    const credentials = await prisma.credentials.findFirst({
      where: {
        userId: id,
        provider: provider
      },
    });
    if (!credentials) {
      return null;  
    } 
    return {
      id: credentials.id,
      provider: credentials.provider,
      credentials: credentials.credentials,
      userId: credentials.userId
    };
  }
}
