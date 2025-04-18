import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { injectable } from "tsyringe";
import {
  GitLabProjects,
  GitLabProjectsIssues,
  AwardEmojiAdd
} from "../../models/gitlab.issue.model";
import { GitLabIssueService } from "../services/gitlab.issue.service";

@Resolver(() => GitLabProjects)
@injectable()
export class GitLabIssueResolver {
  constructor(private readonly gitLabIssueService: GitLabIssueService) {}

  @Query(() => [GitLabProjects])
  async getGitLabProjectsList(
    @Arg("number_of_projects") number_of_projects: number,
    @Ctx() context: any
  ): Promise<GitLabProjects[] | undefined> {
    return await this.gitLabIssueService.getGitLabProjectsList(
      number_of_projects,
      context?.userId
    );
  }

  @Query(() => [GitLabProjectsIssues])
  async getGitLabProjectIssues(
    @Arg("project_path") project_path: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues[] | undefined> {
    return await this.gitLabIssueService.getGitLabProjectIssues(project_path, context?.userId);
  }

  @Query(() => GitLabProjectsIssues)
  async getGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("issue_id") issue_id: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues | undefined> {
    return await this.gitLabIssueService.getGitLabProjectIssue(
      project_path,
      issue_id,
      context?.userId
    );
  }

  @Mutation(() => GitLabProjectsIssues)
  async createGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues | undefined> {
    return await this.gitLabIssueService.createGitLabProjectIssue(
      project_path,
      title,
      description,
      context?.userId
    );
  }

    @Mutation(() => AwardEmojiAdd)
    async awardEmojiToGitLabProjectIssue(
        @Arg("issue_id") issue_id: string,
        @Arg("award_emoji") award_emoji: string,
        @Ctx() context: any
    ): Promise<AwardEmojiAdd | undefined> {
        return await this.gitLabIssueService.awardEmojiToGitLabProjectIssue(
            issue_id,
            award_emoji,
            context?.userId
        );
    }
}
