import {
  ObjectType, Field, Int,
} from 'type-graphql';

@ObjectType()
export class CompletedLesson {
  // Metadata
  @Field(() => Int)
  id: number
  
  @Field(() => String)
  lessonId: string

  @Field(() => String)
  accountId: string

}
