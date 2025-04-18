import { LoggerService } from "../../services/logger.service";
import { config } from "../../services/config.service";

export class GitLabBaseRepository {
    private readonly logger: LoggerService = new LoggerService(GitLabBaseRepository.name);

    protected async executeGitLabQueries(query:string, variables:any, credentials:string): Promise<any> {
        try {
            const response = await fetch(config.GITLAB_API_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${credentials}`,
                },
                body: JSON.stringify({
                  query: query,
                  variables: variables,
                }),
              });
          
              return await response.json();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(message);
            throw new Error(`Error fetching GitLab issues: ${message}`);
        }
        
    }
    
}