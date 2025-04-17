import { IGitLabRepository } from "src/interfaces/iGitLabRepository";
import { GitLabProjects, GitLabProjectsIssues, AwardEmojiAdd } from "../../models/gitlab.issue.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GitLabIssueService {
    constructor(@inject('IGitLabRepository') private readonly githubRepository:IGitLabRepository) {}

    getGitLabProjectsList(number_of_projects: number): Promise<GitLabProjects[] | undefined> {
        return this.githubRepository.getGitLabProjectsList(number_of_projects);
    }

    getGitLabProjectIssues(project_path: string): Promise<GitLabProjectsIssues[] | undefined> {
        return this.githubRepository.getGitLabProjectIssues(project_path);
    }

    getGitLabProjectIssue(project_path: string, issue_id: string): Promise<GitLabProjectsIssues | undefined> {
        return this.githubRepository.getGitLabProjectIssue(project_path, issue_id);
    }

    createGitLabProjectIssue(project_path: string, title: string, description: string): Promise<GitLabProjectsIssues | undefined> {
        return this.githubRepository.createGitLabProjectIssue(project_path, title, description);
    }

    awardEmojiToGitLabProjectIssue(issue_id: string, award_emoji: string): Promise<AwardEmojiAdd | undefined> {
        return this.githubRepository.awardEmojiToGitLabProjectIssue(issue_id, award_emoji);
    }
}