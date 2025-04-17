import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { injectable } from "tsyringe";
import { GitLabProjects, GitLabProjectsIssues } from "../../models/gitlab.issue.model";
import { GitLabIssueService } from "../services/gitlab.issue.service";

@Resolver(() => GitLabProjects)
@injectable()
export class GitLabIssueResolver {

    constructor(private readonly gitLabIssueService: GitLabIssueService) {}

    @Query(() => [GitLabProjects])
    async getGitLabProjectsList(
        @Arg("number_of_projects") number_of_projects: number,
    ): Promise<GitLabProjects[] | undefined> {
        return await this.gitLabIssueService.getGitLabProjectsList(number_of_projects);
    }

    @Query(() => [GitLabProjectsIssues])
    async getGitLabProjectIssues(
        @Arg("project_path") project_path: string,
    ): Promise<GitLabProjectsIssues[] | undefined> {
        return await this.gitLabIssueService.getGitLabProjectIssues(project_path);
    }
}