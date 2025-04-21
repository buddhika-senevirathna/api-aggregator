import { GitHubIssue, GitHubRepositories } from "../models/github.issue.model";

export interface IGitHubRepository {
  getGitHubRepositoryIssues(
    owner: string,
    repository: string,
    credentials: string
  ): Promise<GitHubIssue[] | undefined>;
  getGitHubIssueDetails(
    owner: string,
    repository: string,
    issue_number: number, credentials:string
  ): Promise<GitHubIssue | undefined>;

  getGitHubNumberOfRepos(number_of_repos: number, credentials:string): Promise<GitHubRepositories[]>;

  reactGitHubIssue(
    id: string,
    reaction: string,
    credentials: string
  ): Promise<GitHubIssue | undefined>;

  getGitHubRepositoryId(
    owner: string,
    repository: string, credentials:string
  ): Promise<string | undefined>;

  createGitHubIssue(
    repository: string,
    title: string,
    body: string, credentials:string
  ): Promise<GitHubIssue | undefined>;
}
