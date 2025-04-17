import { GitLabProjects, GitLabProjectsIssues, AwardEmojiAdd } from "../models/gitlab.issue.model";

export interface IGitLabRepository {
    getGitLabProjectsList(
        number_of_projects: number,
    ): Promise<GitLabProjects[] | undefined>;

    getGitLabProjectIssues(
        project_path: string,
    ): Promise<GitLabProjectsIssues[] | undefined>;

    getGitLabProjectIssue(
        project_path: string,
        issue_id: string,
    ): Promise<GitLabProjectsIssues | undefined>;

    createGitLabProjectIssue(
        project_path: string,
        title: string,
        description: string,
    ): Promise<GitLabProjectsIssues | undefined>;

    awardEmojiToGitLabProjectIssue(
        issue_id: string,
        award_emoji: string,
    ): Promise<AwardEmojiAdd | undefined>;
    
}