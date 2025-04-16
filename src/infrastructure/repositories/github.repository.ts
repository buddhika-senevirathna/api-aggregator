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
  async getGitHubRepositoryIssues(
    owner: string,
    repo: string
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
    });
    return result.data.repository.issues.nodes;
  }

  async getGitHubIssueDetails(
    owner: string,
    repository_name: string,
    issue_number: number
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
    });
    return result.data.repository.issue;
  }

  async getGitHubNumberOfRepos(
    number_of_repos: number
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
    const result = await this.executeGitHubQueries(query, { number_of_repos });
    return result.data.viewer.repositories.nodes;
  }

  async reactGitHubIssue(
    owner: string,
    repository: string,
    id: string,
    reaction: string
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
    });
    console.log("result", result);
    return result;
  }
}
