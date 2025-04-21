import { IGitHubRepository } from "src/interfaces/iGitHubRepository";
import { GitHubIssue, GitHubRepositories } from "src/models/github.issue.model";
import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";
import { config } from "../../services/config.service";

@injectable()
export class GithubIssueService {
  constructor(
    @inject("IGitHubRepository")
    private readonly gitHubRepository: IGitHubRepository,
    private readonly userService: UserService
  ) {}

  async getGitHubRepositoryIssues(
    owner: string,
    repository: string,
    postgresUserId: string
  ): Promise<GitHubIssue[] | undefined> {
    const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.getGitHubRepositoryIssues(
      owner,
      repository,
      credentials
    );
  }

  async getGitHubIssueDetails(
    owner: string,
    repository: string,
    issue_number: number,
    userId: string
  ): Promise<GitHubIssue | undefined> {
    const credentials = await this.userService.getUserCredentials(userId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.getGitHubIssueDetails(
      owner,
      repository,
      issue_number,
      credentials
    );
  }

  async getGitHubNumberOfRepos(
    number_of_repos: number, userId: string
  ): Promise<GitHubRepositories[]> {
    const credentials = await this.userService.getUserCredentials(userId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.getGitHubNumberOfRepos(number_of_repos, credentials);
  }

  async reactGitHubIssue(
    id: string,
    reaction: string,
    userId: string
  ): Promise<GitHubIssue | undefined> {
    const credentials = await this.userService.getUserCredentials(userId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.reactGitHubIssue(
      id,
      reaction,
      credentials
    );
  }

  async createGitHubIssue(
    repository: string,
    title: string,
    body: string,
    userId: string
  ): Promise<GitHubIssue | undefined> {
    const credentials = await this.userService.getUserCredentials(userId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.createGitHubIssue(
      repository,
      title,
      body,
      credentials
    );
  }

  async getGitHubRepositoryId(
    owner: string,
    repository: string,
    userId: string
  ): Promise<string | undefined> {
    const credentials = await this.userService.getUserCredentials(userId, config.GITHUB_TOKEN);
    if (!credentials) {
      throw new Error("User credentials not found");
    }
    return await this.gitHubRepository.getGitHubRepositoryId(owner, repository, credentials);
  }
}
