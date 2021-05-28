import {
  ObjectType, Field, Int,
} from 'type-graphql';

@ObjectType()
export class CompletedProject {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  accountId: string

  @Field(() => String)
  projectId: string
}
