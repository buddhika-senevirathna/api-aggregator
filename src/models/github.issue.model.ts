import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class GitHubIssue {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  url!: string;

  @Field(() => [GitHubUser])
  author!: GitHubUser[];
}

@ObjectType()
export class GitHubUser {
  @Field(() => String)
  login!: string;
}