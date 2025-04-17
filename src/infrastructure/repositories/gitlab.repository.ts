import { IGitLabRepository } from "../../interfaces/iGitLabRepository";
import { injectable } from "tsyringe";
import { GitLabProjects,GitLabProjectsIssues } from "../../models/gitlab.issue.model";
import fetch from "node-fetch";
import { LoggerService } from "../../services/logger.service";
import { config } from "../../services/config.service";

@injectable()
export class GitLabRepository implements IGitLabRepository {
  constructor() {}
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
    const response = await fetch(config.GITLAB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.GITLAB_TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          number_of_projects,
        },
      }),
    });

    const data = await response.json();
    return data.data.projects.nodes;
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
    const response = await fetch(config.GITLAB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.GITLAB_TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          project_path,
        },
      }),
    });
    const projectIssueList = await response.json();
    return projectIssueList.data.project.issues.nodes;
  }
}
