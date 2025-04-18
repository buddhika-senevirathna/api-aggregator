import { IGitHubRepository } from "../../interfaces/iGitHubRepository";
import { injectable } from "tsyringe";
import {
  GitHubIssue,
  GitHubRepositories,
} from "../../models/github.issue.model";
import { LoggerService } from "../../services/logger.service";
import { GitHubBaseRepository } from "./github.base.repository";


@injectable()
export class GithubRepository
  extends GitHubBaseRepository
  implements IGitHubRepository
{
  private readonly logger: LoggerService = new LoggerService(GithubRepository.name);

  /**
   * Return the last 10 issues of a repository related to a specific user
   * @param repo 
   * @param credentials 
   * @returns 
   */
  async getGitHubRepositoryIssues(
    owner: string,
    repo: string,
    credentials: string
  ): Promise<GitHubIssue[] | undefined> {
    const query = `query ($owner: String!, $repository_name: String!) {
            repository(owner: $owner, name: $repository_name) {
                issues(last: 10, states: OPEN) {
                    nodes{
                        id
                        title
                        url
                        author{
                            login
                        }
                        labels(first:5) {
                        edges {
                        node {
                            name
                            }
                          }
                        }
                    }
                }          
            }
        }`;
    const result = await this.executeGitHubQueries(query, {
      owner,
      repository_name: repo,
    }, credentials);
    return result.data.repository.issues.nodes;
  }

  /**
   * Return the details of one issue in the repository.
   * @param owner 
   * @param repository_name 
   * @param issue_number 
   * @param credentials 
   * @returns 
   */
  async getGitHubIssueDetails(
    owner: string,
    repository_name: string,
    issue_number: number,
    credentials: string
  ): Promise<GitHubIssue | undefined> {
    const query = `query ($owner: String!, $repository_name: String!, $issue_number: Int!) {
        repository(owner: $owner, name: $repository_name) {
            issue(number: $issue_number) {
                id
      					title
      					url
            }          
        }
    }`;
    const result = await this.executeGitHubQueries(query, {
      owner,
      repository_name,
      issue_number,
    }, credentials);
    return result.data.repository.issue;
  }

  /**
   * Number of repositories belongs to one GitHub token
   * @param number_of_repos 
   * @param credentials 
   * @returns 
   */
  async getGitHubNumberOfRepos(
    number_of_repos: number,
    credentials: string
  ): Promise<GitHubRepositories[]> {
    const query = `query ($number_of_repos: Int!) {
      viewer {
          name
          repositories(last: $number_of_repos) {
              nodes {
                  name
              }
          }
      }
  }`;
    const result = await this.executeGitHubQueries(query, { number_of_repos }, credentials);
    return result.data.viewer.repositories.nodes;
  }

  /**
   * User can react to and issue like laugh, hooray, confused, heart, eyes, rocket, thumbs_up(+1), thumbs_down(-1)
   * @param owner 
   * @param repository 
   * @param id : Issue id
   * @param reaction : Reactions (laugh, hooray, confused, heart, eyes, rocket, thumbs_up, thumbs_down)
   * @param credentials 
   * @returns 
   */
  async reactGitHubIssue(
    id: string,
    reaction: string,
    credentials: string
  ): Promise<GitHubIssue | undefined> {
    const query = `mutation ($issue_id: ID!, $GitHubIssueReaction: ReactionContent!) {
      addReaction(input: { subjectId: $issue_id, content:$GitHubIssueReaction  }) {
        reaction {
          content
        }
        subject {
          id
        }
      }
    }`;
    const result = await this.executeGitHubQueries(query, {
      issue_id: id,
      GitHubIssueReaction: reaction,
    }, credentials);
    return result;
  }

  /**
   * Return the id of a repository based on the owner and repository name.
   * @param owner 
   * @param repository_name 
   * @param credentials 
   * @returns 
   */
  async getGitHubRepositoryId( 
    owner: string,
    repository_name: string,
    credentials: string
  ): Promise<string | undefined> {
    const query = `query ($owner: String!, $repository_name: String!) {
      repository(owner: $owner, name: $repository_name) {
        id
      }
    }`;
    const result = await this.executeGitHubQueries(query, {
      owner,
      repository_name,
    },credentials);
    return result.data.repository.id;
  }

  /**
   * Create a new issue in the repository.
   * @param repository Id of the repository
   * @param title Name of the issue
   * @param body description of the issue
   * @param credentials 
   * @returns 
   */
  async createGitHubIssue(
    repository: string,
    title: string,
    body: string,
    credentials: string
  ): Promise<GitHubIssue | undefined> {
    const query = `mutation ($repository_id: ID!, $title: String!, $body: String!) {
      createIssue(input: { repositoryId: $repository_id, title:$title, body:$body }) {
        issue {
          id
          title
          url
        }
      }
    }`;
    const result = await this.executeGitHubQueries(query, {
      repository_id: repository,
      title,
      body,
    }, credentials);
    return result.data.createIssue.issue;
  }
}
