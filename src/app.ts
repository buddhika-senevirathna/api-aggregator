import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "tsyringe";
import { connectDB } from "./services/db.service";
import { UserResolver } from "./infrastructure/resolvers/user.resolver";
import { LoggerService } from "./services/logger.service";
import "./container";
import { GitHubIssueResolver } from "./infrastructure/resolvers/github.resolver";

async function bootstrap() {
  const logger = new LoggerService();
  await connectDB();

  const schema = await buildSchema({
    resolvers: [UserResolver, GitHubIssueResolver],
    container: {
      get: (someClass, resolverData) => container.resolve(someClass),
    },
  });

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  logger.log(`🚀 Server ready at ${url}`);
}

bootstrap();
