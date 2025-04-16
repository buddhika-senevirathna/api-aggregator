import { IGitHubRepository } from "src/interfaces/iGitHubRepository";
import { GitHubIssue, GitHubRepositories } from "src/models/github.issue.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GithubIssueService {
    constructor(@inject('IGitHubRepository') private readonly gitHubRepository:IGitHubRepository) {}

    async getGitHubRepositoryIssues(owner:string, repository:string): Promise<GitHubIssue[]| undefined> {
        return await this.gitHubRepository.getGitHubRepositoryIssues(owner, repository);
    }

   async getGitHubIssueDetails(owner:string, repository:string, issue_number:number): Promise<GitHubIssue| undefined> {
        return await this.gitHubRepository.getGitHubIssueDetails(owner, repository, issue_number);
    }

    async getGitHubNumberOfRepos(number_of_repos:number): Promise<GitHubRepositories[]> {
        return await this.gitHubRepository.getGitHubNumberOfRepos(number_of_repos);
    }

    async reactGitHubIssue(owner:string, repository:string, id:string, reaction:string): Promise<GitHubIssue| undefined> {
        return await this.gitHubRepository.reactGitHubIssue(owner, repository, id, reaction);
    }
}