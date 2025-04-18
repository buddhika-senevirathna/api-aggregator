import { IGitLabRepository } from "src/interfaces/iGitLabRepository";
import { GitLabProjects, GitLabProjectsIssues, AwardEmojiAdd } from "../../models/gitlab.issue.model";
import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";
import { config } from "../../services/config.service";

@injectable()
export class GitLabIssueService {
    constructor(@inject('IGitLabRepository') private readonly githubRepository:IGitLabRepository,
    private readonly userService:UserService,
) {}

    async getGitLabProjectsList(number_of_projects: number, postgresUserId:string): Promise<GitLabProjects[] | undefined> {
        const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITLAB_TOKEN);
            if (!credentials) {
              throw new Error("User credentials not found");
            }
        return this.githubRepository.getGitLabProjectsList(number_of_projects, credentials);
    }

    async getGitLabProjectIssues(project_path: string, postgresUserId:string): Promise<GitLabProjectsIssues[] | undefined> {
        const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITLAB_TOKEN);
            if (!credentials) {
              throw new Error("User credentials not found");
            }
        return this.githubRepository.getGitLabProjectIssues(project_path, credentials);
    }

    async getGitLabProjectIssue(project_path: string, issue_id: string, postgresUserId:string): Promise<GitLabProjectsIssues | undefined> {
        const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITLAB_TOKEN);
            if (!credentials) {
              throw new Error("User credentials not found");
            }
        return this.githubRepository.getGitLabProjectIssue(project_path, issue_id, credentials);
    }

    async createGitLabProjectIssue(project_path: string, title: string, description: string, postgresUserId:string): Promise<GitLabProjectsIssues | undefined> {
        const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITLAB_TOKEN);
            if (!credentials) {
              throw new Error("User credentials not found");
            }
        return this.githubRepository.createGitLabProjectIssue(project_path, title, description, credentials);
    }

    async awardEmojiToGitLabProjectIssue(issue_id: string, award_emoji: string, postgresUserId:string): Promise<AwardEmojiAdd | undefined> {
        const credentials = await this.userService.getUserCredentials(postgresUserId, config.GITLAB_TOKEN);
            if (!credentials) {
              throw new Error("User credentials not found");
            }
        return this.githubRepository.awardEmojiToGitLabProjectIssue(issue_id, award_emoji, credentials);
    }
}