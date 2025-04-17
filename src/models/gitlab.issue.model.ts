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
    id!: string;
    
    @Field()
    iid!: string;

    @Field()
    title!: string;

    @Field()
    description!: string;
}

@ObjectType()
export class AwardEmojiAdd{
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    unicode!: string;

    @Field()
    emoji!: string;

    @Field()
    unicodeVersion!: string;
}

