import { config } from "../../services/config.service";
import { LoggerService } from "../../services/logger.service";

const logger = new LoggerService();

export class GitHubBaseRepository {

  async executeGitHubQueries(query: string, variables: {}, credentials: string | undefined) {
    try {
      const response = await fetch(config.GITHUB_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      return await response.json();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error("Error fetching GitHub issues:", message);
    }
  }
}
