import { Resolver, Query, Mutation, Arg } from "type-graphql";
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
    @Arg("number_of_projects") number_of_projects: number
  ): Promise<GitLabProjects[] | undefined> {
    return await this.gitLabIssueService.getGitLabProjectsList(
      number_of_projects
    );
  }

  @Query(() => [GitLabProjectsIssues])
  async getGitLabProjectIssues(
    @Arg("project_path") project_path: string
  ): Promise<GitLabProjectsIssues[] | undefined> {
    return await this.gitLabIssueService.getGitLabProjectIssues(project_path);
  }

  @Query(() => GitLabProjectsIssues)
  async getGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("issue_id") issue_id: string
  ): Promise<GitLabProjectsIssues | undefined> {
    return await this.gitLabIssueService.getGitLabProjectIssue(
      project_path,
      issue_id
    );
  }

  @Mutation(() => GitLabProjectsIssues)
  async createGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("title") title: string,
    @Arg("description") description: string
  ): Promise<GitLabProjectsIssues | undefined> {
    return await this.gitLabIssueService.createGitLabProjectIssue(
      project_path,
      title,
      description
    );
  }

    @Mutation(() => AwardEmojiAdd)
    async awardEmojiToGitLabProjectIssue(
        @Arg("issue_id") issue_id: string,
        @Arg("award_emoji") award_emoji: string
    ): Promise<AwardEmojiAdd | undefined> {
        return await this.gitLabIssueService.awardEmojiToGitLabProjectIssue(
            issue_id,
            award_emoji
        );
    }
}
