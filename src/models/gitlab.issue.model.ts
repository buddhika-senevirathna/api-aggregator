import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GitLabProjects{
    @Field()
    name!: string;

    @Field()
    fullPath!: string;
}

@ObjectType()
export class GitLabProjectsIssues{
    @Field()
    title!: string;

    @Field()
    description!: string;
}