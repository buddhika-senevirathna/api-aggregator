import { GitLabProjects, GitLabProjectsIssues, AwardEmojiAdd } from "../models/gitlab.issue.model";

export interface IGitLabRepository {
    getGitLabProjectsList(
        number_of_projects: number,
        credentials: string
    ): Promise<GitLabProjects[] | undefined>;

    getGitLabProjectIssues(
        project_path: string,
        credentials: string
    ): Promise<GitLabProjectsIssues[] | undefined>;

    getGitLabProjectIssue(
        project_path: string,
        issue_id: string,
        credentials: string
    ): Promise<GitLabProjectsIssues | undefined>;

    createGitLabProjectIssue(
        project_path: string,
        title: string,
        description: string,
        credentials: string
    ): Promise<GitLabProjectsIssues | undefined>;

    awardEmojiToGitLabProjectIssue(
        issue_id: string,
        award_emoji: string,
        credentials: string
    ): Promise<AwardEmojiAdd | undefined>;
    
}