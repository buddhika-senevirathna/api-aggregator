import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { injectable } from "tsyringe";
import { GitHubIssue, GitHubRepositories } from "../../models/github.issue.model";
import { GithubIssueService } from "../services/github.issue.service";


@Resolver(() => GitHubIssue)
@injectable()
export class GitHubIssueResolver {
    constructor(private readonly gitHubIssueService: GithubIssueService) {}

    @Query(() => [GitHubIssue])
    async getGitHubIssues(@Arg("owner") owner: string, @Arg("repository") repository: string, @Arg("userId") userId: string, @Ctx() context: any ): Promise<GitHubIssue[] | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.getGitHubRepositoryIssues(owner, repository, userId, postgresUserId);
        } catch (error) {
            console.error("Error fetching GitHub issues:", error);
            throw new Error("Failed to fetch GitHub issues"); 
        }
    }

    @Query(() => GitHubIssue)
    async getGitHubIssueDetails(@Arg("owner") owner: string, @Arg("repository") repository: string, @Arg("issue_number") issue_number: number, @Ctx() context: any): Promise<GitHubIssue | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.getGitHubIssueDetails(owner, repository, issue_number, postgresUserId);
        } catch (error) {
            console.error("Error fetching GitHub issue details:", error);
            throw new Error("Failed to fetch GitHub issue details");
        }
    }

    @Query(() => [GitHubRepositories])
    async getGitHubNumberOfRepos(@Arg("number_of_repos") number_of_repos: number, @Ctx() context: any): Promise<GitHubRepositories[]> {
        return await this.gitHubIssueService.getGitHubNumberOfRepos(number_of_repos, context?.userId);
    }

    @Query(() => String)
    async getGitHubRepositoryId(@Arg("owner") owner: string, @Arg("repository") repository: string, @Ctx() context: any): Promise<string | undefined> {
            return await this.gitHubIssueService.getGitHubRepositoryId(owner, repository, context.userId);
    }

    @Mutation(() => GitHubIssue)
    async reactGitHubIssue(
        @Arg("owner") owner: string,
        @Arg("repository") repository: string, 
        @Arg("issue_id") id: string,
        @Arg("reaction") reaction: string,
        @Ctx() context: any
    ): Promise<GitHubIssue | undefined> {
        return await this.gitHubIssueService.reactGitHubIssue(owner, repository, id, reaction, context.userId);
    }

    @Mutation(() => GitHubIssue)
    async createGitHubIssue(
        @Arg("repository_id") repository: string,
        @Arg("title") title: string,
        @Arg("body") body: string,
        @Ctx() context: any
    ): Promise<GitHubIssue | undefined> {
        try {
            return await this.gitHubIssueService.createGitHubIssue(repository, title, body, context.userId);
        } catch (error) {
            console.error("Error creating GitHub issue:", error);
            throw new Error("Failed to create GitHub issue");
        }
    }
}