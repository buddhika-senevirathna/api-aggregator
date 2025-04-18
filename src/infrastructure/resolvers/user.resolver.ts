import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User, Credentials } from "../../models/user.model";
import { UserService } from "../services/user.service";
import { injectable } from "tsyringe";

@Resolver(() => User)
@injectable()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Mutation(() => User)
    async createUser(
        @Arg("name") name: string,
        @Arg("email") email: string,
    ): Promise<User> {
        return this.userService.createUser(name, email);
    }
    @Mutation(() => Credentials)
    async createUserWithCredentials(
        @Arg("userId") name: string,
        @Arg("provider") provider: string,
        @Arg("credentials") credentials: string): Promise<any> {
        return this.userService.createUserWithCredentials(name, provider, credentials);
    }
        
}
