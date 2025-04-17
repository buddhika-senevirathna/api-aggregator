import { IGitLabRepository } from "../../interfaces/iGitLabRepository";
import { injectable } from "tsyringe";
import {
  GitLabProjects,
  GitLabProjectsIssues,
  AwardEmojiAdd
} from "../../models/gitlab.issue.model";
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
                          id
                          iid
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

  async getGitLabProjectIssue(
    project_path: string,
    issue_id: string
  ): Promise<GitLabProjectsIssues | undefined> {
    const query = `query ($project_path: ID!, $issue_id: String!) {
                    project(fullPath: $project_path) {
                      name
                      issue(iid: $issue_id) {
                        id
                        iid
                        title
                        description
                      }
                    }
                  }`;
    const projectIssue = await this.executeGitLabQueries(query, {
      project_path,
      issue_id,
    });
    console.log(projectIssue);

    return projectIssue.data.project.issue;
  }

  async createGitLabProjectIssue(
    project_path: string,
    title: string,
    description: string
  ): Promise<GitLabProjectsIssues | undefined> {
    const query = `mutation ($project_path: ID!, $title: String!, $description: String!) {
                    createIssue(input: { projectPath: $project_path, title: $title, description: $description }) {
                      issue {
                        id
                        iid
                        title
                        description
                      }
                    }
                  }`;
    const projectIssue = await this.executeGitLabQueries(query, {
      project_path,
      title,
      description,
    });

    return projectIssue.data.createIssue.issue;
  }

  async awardEmojiToGitLabProjectIssue(
    issue_id: string,
    award_emoji: string
  ): Promise<AwardEmojiAdd | undefined> {
    const query = `mutation ($issue_id: AwardableID!, $award_emoji: String!) {
                  awardEmojiAdd(input: { awardableId: $issue_id,
                      name: $award_emoji
                    }) {
                    awardEmoji {
                      name
                      description
                      unicode
                      emoji
                      unicodeVersion
                      user {
                        name
                      }
                    }
                    errors
                  }
        }`;
    const projectIssue = await this.executeGitLabQueries(query, {
      issue_id,
      award_emoji,
    });

    return projectIssue.data.awardEmojiAdd.awardEmoji;
  }
}
