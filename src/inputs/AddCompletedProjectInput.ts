import { InputType, Field, Int } from 'type-graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class AddCompletedProjectInput {
  @Field(() => String, { nullable: true })
  AccountId?: string

  @Field(() => String, { nullable: true })
  ProjectId?: string
}