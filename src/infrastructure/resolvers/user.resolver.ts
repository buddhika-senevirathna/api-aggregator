import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../../models/user.model";
import { UserService } from "../services/user.service";
import { injectable } from "tsyringe";

@Resolver(() => User)
@injectable()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        console.log("Fetching users for resolver:", this.userService);
        return this.userService.getUsers();
    }

    @Mutation(() => User)
    async createUser(@Arg("name") name: string): Promise<User> {
        return this.userService.createUser(name);
    }
}
