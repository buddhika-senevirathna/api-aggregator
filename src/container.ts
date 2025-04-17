import { container } from "tsyringe";
import { IUserRepository } from "./interfaces/iUserRepository";
import { UserRepository } from "./infrastructure/repositories/user.repository";
import { IGitHubRepository } from "./interfaces/iGitHubRepository";
import { GithubRepository } from "./infrastructure/repositories/github.repository";
import { IGitLabRepository } from "./interfaces/iGitLabRepository";
import { GitLabRepository } from "./infrastructure/repositories/gitlab.repository";

container.register<IGitHubRepository>("IGitHubRepository", {
    useClass: GithubRepository,
});

container.register<IGitLabRepository>("IGitLabRepository", {
    useClass: GitLabRepository,
});

container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
});
