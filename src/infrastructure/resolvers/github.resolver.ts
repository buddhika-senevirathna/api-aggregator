import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { injectable } from "tsyringe";
import { GitHubIssue, GitHubRepositories } from "../../models/github.issue.model";
import { GithubIssueService } from "../services/github.issue.service";
import { LoggerService } from "../../services/logger.service";


@Resolver(() => GitHubIssue)
@injectable()
export class GitHubIssueResolver {
    private readonly logger: LoggerService = new LoggerService(GitHubIssueResolver.name);
    constructor(private readonly gitHubIssueService: GithubIssueService) {}
    
    @Query(() => [GitHubIssue])
    async getGitHubIssues(@Arg("owner") owner: string, @Arg("repository") repository: string, @Ctx() context: any ): Promise<GitHubIssue[] | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.getGitHubRepositoryIssues(owner, repository, postgresUserId);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to fetch GitHub issues ${message}`); 
        }
    }

    @Query(() => GitHubIssue)
    async getGitHubIssueDetails(@Arg("owner") owner: string, @Arg("repository") repository: string, @Arg("issue_number") issue_number: number, @Ctx() context: any): Promise<GitHubIssue | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.getGitHubIssueDetails(owner, repository, issue_number, postgresUserId);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to fetch GitHub issues details ${message}`); 
        }
    }

    @Query(() => [GitHubRepositories])
    async getGitHubNumberOfRepos(@Arg("number_of_repos") number_of_repos: number, @Ctx() context: any): Promise<GitHubRepositories[]> {
        try {
            return await this.gitHubIssueService.getGitHubNumberOfRepos(number_of_repos, context?.userId);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to fetch GitHub issues details ${message}`); 
        }  
    }

    @Query(() => String)
    async getGitHubRepositoryId(@Arg("owner") owner: string, @Arg("repository") repository: string, @Ctx() context: any): Promise<string | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.getGitHubRepositoryId(owner, repository, postgresUserId);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to fetch GitHub repository ID ${message}`); 
        }
    }

    @Mutation(() => GitHubIssue)
    async reactGitHubIssue(
        @Arg("owner") owner: string,
        @Arg("repository") repository: string, 
        @Arg("issue_id") id: string,
        @Arg("reaction") reaction: string,
        @Ctx() context: any
    ): Promise<GitHubIssue | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.reactGitHubIssue(owner, repository, id, reaction, postgresUserId);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to react to GitHub issue ${message}`); 
        }
    }

    @Mutation(() => GitHubIssue)
    async createGitHubIssue(
        @Arg("repository_id") repository: string,
        @Arg("title") title: string,
        @Arg("body") body: string,
        @Ctx() context: any
    ): Promise<GitHubIssue | undefined> {
        try {
            const postgresUserId = context?.userId;
            return await this.gitHubIssueService.createGitHubIssue(repository, title, body, postgresUserId);
        } catch (error) {   
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to create GitHub issue ${message}`); 
        }
    }
}