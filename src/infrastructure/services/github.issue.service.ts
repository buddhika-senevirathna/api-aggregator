import { IGitHubRepository } from "src/interfaces/iGitHubRepository";
import { GitHubIssue } from "src/models/github.issue.model";
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
}