import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { injectable } from "tsyringe";
import { GitHubIssue, GitHubRepositories } from "../../models/github.issue.model";
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

    @Query(() => [GitHubRepositories])
    async getGitHubNumberOfRepos(@Arg("number_of_repos") number_of_repos: number): Promise<GitHubRepositories[]>{
              return await this.gitHubIssueService.getGitHubNumberOfRepos(number_of_repos);
    }

    @Query(() => String)
    async getGitHubRepositoryId(@Arg("owner") owner: string, @Arg("repository") repository: string): Promise<string | undefined> {
            return await this.gitHubIssueService.getGitHubRepositoryId(owner, repository);
    }

    @Mutation(() => GitHubIssue)
    async reactGitHubIssue(
        @Arg("owner") owner: string,
        @Arg("repository") repository: string, 
        @Arg("issue_id") id: string,
        @Arg("reaction") reaction: string
    ): Promise<GitHubIssue | undefined> {
        return await this.gitHubIssueService.reactGitHubIssue(owner, repository, id, reaction);
    }

    @Mutation(() => GitHubIssue)
    async createGitHubIssue(
        @Arg("repository_id") repository: string,
        @Arg("title") title: string,
        @Arg("body") body: string
    ): Promise<GitHubIssue | undefined> {
        try {
            return await this.gitHubIssueService.createGitHubIssue(repository, title, body);
        } catch (error) {
            console.error("Error creating GitHub issue:", error);
            throw new Error("Failed to create GitHub issue");
        }
    }
}