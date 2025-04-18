import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { injectable } from "tsyringe";
import {
  GitLabProjects,
  GitLabProjectsIssues,
  AwardEmojiAdd
} from "../../models/gitlab.issue.model";
import { GitLabIssueService } from "../services/gitlab.issue.service";
import { LoggerService } from "../../services/logger.service";

@Resolver(() => GitLabProjects)
@injectable()
export class GitLabIssueResolver {
  private readonly logger: LoggerService = new LoggerService(GitLabIssueResolver.name);
  constructor(private readonly gitLabIssueService: GitLabIssueService) {}

  @Query(() => [GitLabProjects])
  async getGitLabProjectsList(
    @Arg("number_of_projects") number_of_projects: number,
    @Ctx() context: any
  ): Promise<GitLabProjects[] | undefined> {
    try {
      const postgresUserId = context?.userId;
      return await this.gitLabIssueService.getGitLabProjectsList(
        number_of_projects,
        postgresUserId
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to create GitLab project list ${message}`); 
    }
  }

  @Query(() => [GitLabProjectsIssues])
  async getGitLabProjectIssues(
    @Arg("project_path") project_path: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues[] | undefined> {
    try {
      const postgresUserId = context?.userId;
      return await this.gitLabIssueService.getGitLabProjectIssues(project_path, postgresUserId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to create GitLab project issues ${message}`);
      
    }
  }

  @Query(() => GitLabProjectsIssues)
  async getGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("issue_id") issue_id: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues | undefined> {
    try {
      const postgresUserId = context?.userId;
      return await this.gitLabIssueService.getGitLabProjectIssue(
        project_path,
        issue_id,
        postgresUserId
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to create GitLab project issue ${message}`); 
    }
  }

  @Mutation(() => GitLabProjectsIssues)
  async createGitLabProjectIssue(
    @Arg("project_path") project_path: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Ctx() context: any
  ): Promise<GitLabProjectsIssues | undefined> {
    try {
      return await this.gitLabIssueService.createGitLabProjectIssue(
        project_path,
        title,
        description,
        context?.userId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to create GitLab project issue ${message}`); 
      
    }
  }

    @Mutation(() => AwardEmojiAdd)
    async awardEmojiToGitLabProjectIssue(
        @Arg("issue_id") issue_id: string,
        @Arg("award_emoji") award_emoji: string,
        @Ctx() context: any
    ): Promise<AwardEmojiAdd | undefined> {
      try {
        return await this.gitLabIssueService.awardEmojiToGitLabProjectIssue(
          issue_id,
          award_emoji,
          context?.userId
      );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Failed to award emoji project issue ${message}`); 
      }
        
    }
}
