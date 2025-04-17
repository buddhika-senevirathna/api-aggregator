import { IGitLabRepository } from "src/interfaces/iGitLabRepository";
import { GitLabProjects, GitLabProjectsIssues } from "../../models/gitlab.issue.model";
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
}