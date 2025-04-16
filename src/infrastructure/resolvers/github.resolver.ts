import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { injectable } from "tsyringe";
import { GitHubIssue } from "../../models/github.issue.model";
import { GithubIssueService } from "../services/github.issue.service";


@Resolver(() => GitHubIssue)
@injectable()
export class GitHubIssueResolver {
    constructor(private readonly gitHubIssueService: GithubIssueService) {}

    @Query(() => [GitHubIssue])
    async getGitHubIssues(@Arg("owner") owner: string, @Arg("repository") repository: string): Promise<GitHubIssue[] | undefined> {
        try {
            return await this.gitHubIssueService.getGitHubRepositoryIssues(owner, repository);
        } catch (error) {
            console.error("Error fetching GitHub issues:", error);
            throw new Error("Failed to fetch GitHub issues"); 
        }
    }

    @Query(() => GitHubIssue)
    async getGitHubIssueDetails(@Arg("owner") owner: string, @Arg("repository") repository: string, @Arg("issue_number") issue_number: number): Promise<GitHubIssue | undefined> {
        try {
            return await this.gitHubIssueService.getGitHubIssueDetails(owner, repository, issue_number);
        } catch (error) {
            console.error("Error fetching GitHub issue details:", error);
            throw new Error("Failed to fetch GitHub issue details");
        }
    }
}