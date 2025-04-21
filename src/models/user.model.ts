import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  email!:string | null;

  @Field(() => [Credentials], { nullable: true })
  credentials!:[Credentials] | null;
}
@ObjectType()
export class Credentials {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  provider!: string;

  @Field(() => String)
  credentials!: string;

  @Field(() => String)
  userId!: string;
}
