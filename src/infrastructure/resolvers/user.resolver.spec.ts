import "reflect-metadata";
import "jest";
import { jest } from "@jest/globals";
import { UserResolver } from "./user.resolver";
import { UserService } from "../services/user.service";


describe("UserResolver", () => {
    
    beforeEach(() => {

    });

    it("should have function to createUser", () => {
        const mockUserService = jest.fn();
        const resolverInstance = new UserResolver(mockUserService as any);
        expect(typeof resolverInstance.createUser).toBe("function");
    }
    );

    it("CreateUser should call userService.createUser", async () => {
        const mockUserService = { createUser: jest.fn() };
        const resolverInstance = new UserResolver(mockUserService as any);
        await resolverInstance.createUser("John Doe","test@test.com");
        expect(mockUserService.createUser).toHaveBeenCalled();
    });

    it("Should have a function to get user by email", async () => {
        const mockUserService = { getUserByEmail: jest.fn() };
        const resolverInstance = new UserResolver(mockUserService as any);
        await resolverInstance.getUserByEmail("test@email.com");
        expect(typeof resolverInstance.getUserByEmail).toBe("function");
    });
    
});