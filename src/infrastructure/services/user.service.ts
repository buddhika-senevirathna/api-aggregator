import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../interfaces/iUserRepository";
import { User } from "../../models/user.model";
import crypto from 'crypto';
import { LoggerService } from "../../services/logger.service";

@injectable()
export class UserService {
    private readonly algorithm: string = "aes-256-cbc";
    private readonly ENCRYPTION_KEY = "TDnL3fKsE6k90AOhF0EZIGSlu9ridiqO";
    private readonly IV_LENGTH = 16;

    private readonly logger: LoggerService = new LoggerService(UserService.name);

    constructor(@inject("IUserRepository") private readonly repo: IUserRepository) {
        this.algorithm = "aes-256-cbc";
    }

    getUsers(): Promise<User[]> {
        return this.repo.getAll();
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.repo.getUserByEmail(email);
    }

    async getUserCredentials(id: string, provider:string): Promise<string | null> {
        const usersCredentials = await this.repo.getCredentialsByUserId(id, provider);
        if (!usersCredentials) {
            return null;
        }
        const decryptedCredentials = await this.decrypt(usersCredentials.credentials);
        return decryptedCredentials;
    }

    createUser(name: string, email: string): Promise<User> {
        return this.repo.create(name, email);
    }

    async createUserWithCredentials(userId: string, provider: string, credentials: string): Promise<any> {
        const encryptedCredentials = await this.encrypt(credentials);
        return await this.repo.createUserWithCredentials(userId, provider, encryptedCredentials);

    }

    private async encrypt(text: string) {
        try {
            const iv = crypto.randomBytes(this.IV_LENGTH);
            const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY), iv);
            const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error("Decrypt error:", message);
            throw new Error("Encryption failed");
        }
        
      }
      
    private async decrypt(text: string) {
        try {
            const parts = text.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedText = Buffer.from(parts[1], 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY), iv);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error("Decrypt error:", message);
            throw new Error(`Decrypt error: ${message}`);
            
        }
        
    }
}
