import { IGitHubRepository } from "src/interfaces/iGitHubRepository";
import { GitHubIssue, GitHubRepositories } from "src/models/github.issue.model";
import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";

@injectable()
export class GithubIssueService {
  constructor(
    @inject("IGitHubRepository")
    private readonly gitHubRepository: IGitHubRepository,
    @inject("UserService") private readonly userService: UserService
  ) {}

  async getGitHubRepositoryIssues(
    owner: string,
    repository: string,
    userId: string
  ): Promise<GitHubIssue[] | undefined> {
    const credentials = await this.userService.getUserCredentials(userId, "GitHub");
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
    issue_number: number
  ): Promise<GitHubIssue | undefined> {
    return await this.gitHubRepository.getGitHubIssueDetails(
      owner,
      repository,
      issue_number
    );
  }

  async getGitHubNumberOfRepos(
    number_of_repos: number
  ): Promise<GitHubRepositories[]> {
    return await this.gitHubRepository.getGitHubNumberOfRepos(number_of_repos);
  }

  async reactGitHubIssue(
    owner: string,
    repository: string,
    id: string,
    reaction: string
  ): Promise<GitHubIssue | undefined> {
    return await this.gitHubRepository.reactGitHubIssue(
      owner,
      repository,
      id,
      reaction
    );
  }

  async createGitHubIssue(
    repository: string,
    title: string,
    body: string
  ): Promise<GitHubIssue | undefined> {
    return await this.gitHubRepository.createGitHubIssue(
      repository,
      title,
      body
    );
  }

  async getGitHubRepositoryId(
    owner: string,
    repository: string
  ): Promise<string | undefined> {
    return await this.gitHubRepository.getGitHubRepositoryId(owner, repository);
  }
}
