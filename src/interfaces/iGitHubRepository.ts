import { GitHubIssue } from "src/models/github.issue.model";

export interface IGitHubRepository{
    getGitHubRepositoryIssues(owner:string, repository:string): Promise<GitHubIssue| undefined>;
    getGitHubIssueDetails(owner:string, repository:string, issue_number:number): Promise<GitHubIssue| undefined>;
}