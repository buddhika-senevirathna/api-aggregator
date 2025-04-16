import { IGitHubRepository } from "src/interfaces/iGitHubRepository";
import { GitHubIssue } from "src/models/github.issue.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GithubIssueService {
    constructor(@inject('IGitHubRepository') private readonly gitHubRepository:IGitHubRepository) {}

    getGitHubRepositoryIssues(owner:string, repository:string): Promise<GitHubIssue| undefined> {
        return this.gitHubRepository.getGitHubRepositoryIssues(owner, repository);
    }

    getGitHubIssueDetails(owner:string, repository:string, issue_number:number): Promise<GitHubIssue| undefined> {
        return this.gitHubRepository.getGitHubIssueDetails(owner, repository, issue_number);
    }
}