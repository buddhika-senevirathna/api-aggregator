import { IGitHubRepository } from "../../interfaces/iGitHubRepository";
import { config } from "../../services/config.service";
import { injectable } from "tsyringe";
import { GitHubIssue } from "../../models/github.issue.model";
import { LoggerService } from "../../services/logger.service";

const logger = new LoggerService();
@injectable()
export class GithubRepository implements IGitHubRepository {
  async getGitHubRepositoryIssues(
    owner: string,
    repo: string
  ): Promise<GitHubIssue | undefined> {
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
    try {
      const response = await fetch(config.GITHUB_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { owner, repository_name: repo },
        }),
      });
      const result = await response.json();
      return result["data"]["repository"]["issues"]["nodes"];
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error("Error fetching GitHub issues:", message);
    }
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
    try {
      const response = await fetch(config.GITHUB_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { owner, repository_name, issue_number },
        }),
      });
      const result = await response.json();
      console.log(JSON.stringify(result));
      return result["data"]["repository"]["issue"];
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error("Error fetching GitHub issues:", message);
    }
  }
}
