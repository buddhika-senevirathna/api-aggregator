import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "tsyringe";
import { UserResolver } from "./infrastructure/resolvers/user.resolver";
import { LoggerService } from "./services/logger.service";
import { GitHubIssueResolver } from "./infrastructure/resolvers/github.resolver";
import { GitLabIssueResolver } from "./infrastructure/resolvers/gitlab.resolver";
import { config } from "./services/config.service";
import { GraphQLError } from "graphql";
import "./container";

async function bootstrap() {
  const logger = new LoggerService();

  const schema = await buildSchema({
    resolvers: [UserResolver, GitHubIssueResolver, GitLabIssueResolver],
    container: {
      get: (someClass, resolverData) => container.resolve(someClass),
    },
  });

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
    context: async ({ req }) => {
      const userId = req.headers["user-id"];
      if (!userId) {
        throw new GraphQLError("User ID not found in request");
      }
      return { req, userId };
    },
  });
  logger.log(`🚀 Server ready at ${url}`);
}

bootstrap();
