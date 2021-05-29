import {
  ObjectType, Field, Int,
} from 'type-graphql';

@ObjectType()
export class CompletedLesson {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  AccountId: string

  @Field(() => String)
  LessonId: string
}
