import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class GitHubIssue {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class GitHubRepositories {
  @Field()
  name!: string;
}
