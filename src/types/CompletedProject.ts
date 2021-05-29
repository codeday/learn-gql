import {
  ObjectType, Field, Int,
} from 'type-graphql';

@ObjectType()
export class CompletedProject {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  AccountId: string

  @Field(() => String)
  ProjectId: string
}
