import { InputType, Field, Int } from 'type-graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class AddCompletedLessonInput {
  @Field(() => String, { nullable: true })
  accountId?: string

  @Field(() => String, { nullable: true })
  lessonId?: string
}