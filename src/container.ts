import { container } from "tsyringe";
import { IUserRepository } from "./interfaces/iUserRepository";
import { UserRepository } from "./infrastructure/repositories/user.repository";
import { IGitHubRepository } from "./interfaces/iGitHubRepository";
import { GithubRepository } from "./infrastructure/repositories/github.repository";

container.register<IGitHubRepository>("IGitHubRepository", {
    useClass: GithubRepository,
});

