import { IGitLabRepository } from "../../interfaces/iGitLabRepository";
import { injectable } from "tsyringe";
import {
  GitLabProjects,
  GitLabProjectsIssues,
} from "../../models/gitlab.issue.model";
import fetch from "node-fetch";
import { LoggerService } from "../../services/logger.service";
import { config } from "../../services/config.service";
import { GitLabBaseRepository } from "./gitlab.base.repository";

@injectable()
export class GitLabRepository
  extends GitLabBaseRepository
  implements IGitLabRepository
{
  async getGitLabProjectsList(
    number_of_projects: number
  ): Promise<GitLabProjects[] | undefined> {
    const query = `query ($number_of_projects: Int!) {
              projects(membership: true, search: "", first: $number_of_projects) {
                  nodes {
                    name
                    fullPath
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }`;
    const projectList = await this.executeGitLabQueries(query, {
      number_of_projects,
    });

    return projectList.data.projects.nodes;
  }

  async getGitLabProjectIssues(
    project_path: string
  ): Promise<GitLabProjectsIssues[] | undefined> {
    const query = `query ($project_path: ID!) {
                    project(fullPath: $project_path) {
                      name
                      issues {
                        nodes {
                          title
                          description
                        }
                      }
                    }
                  }`;
    const projectIssueList = await this.executeGitLabQueries(query, {
      project_path,
    });
    
    return projectIssueList.data.project.issues.nodes;
  }
}
