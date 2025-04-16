import { GitHubIssue, GitHubRepositories } from "../models/github.issue.model";

export interface IGitHubRepository {
  getGitHubRepositoryIssues(
    owner: string,
    repository: string
  ): Promise<GitHubIssue[] | undefined>;
  getGitHubIssueDetails(
    owner: string,
    repository: string,
    issue_number: number
  ): Promise<GitHubIssue | undefined>;

  getGitHubNumberOfRepos(number_of_repos: number): Promise<GitHubRepositories[]>;

  reactGitHubIssue(
    owner: string,
    repository: string,
    id: string,
    reaction: string
  ): Promise<GitHubIssue | undefined>;
}
