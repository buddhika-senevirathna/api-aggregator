import "reflect-metadata";
import "jest";
import { jest } from "@jest/globals";
import { UserService } from "./user.service";

describe("UserService", () => {
    it("should have function to createUser", () => {
        const mockUserRepository = jest.fn();
        const userServiceInstance = new UserService(mockUserRepository as any);
        expect(typeof userServiceInstance.createUser).toBe("function");
    });

    it("should have function to getUserByEmail", () => {
        const mockUserRepository = jest.fn();
        const userServiceInstance = new UserService(mockUserRepository as any);
        expect(typeof userServiceInstance.getUserByEmail).toBe("function");
    });

    it("should have function to getUserCredentials", () => {
        const mockUserRepository = jest.fn();
        const userServiceInstance = new UserService(mockUserRepository as any);
        expect(typeof userServiceInstance.getUserCredentials).toBe("function");
    });
    
});