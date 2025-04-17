import { GitLabProjects, GitLabProjectsIssues } from "../models/gitlab.issue.model";

export interface IGitLabRepository {
    getGitLabProjectsList(
        number_of_projects: number,
    ): Promise<GitLabProjects[] | undefined>;

    getGitLabProjectIssues(
        project_path: string,
    ): Promise<GitLabProjectsIssues[] | undefined>;
    
}