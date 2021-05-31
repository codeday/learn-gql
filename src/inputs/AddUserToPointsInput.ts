import { InputType, Field, Int } from 'type-graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class AddUserToPointsInput {
  @Field(() => String, { nullable: true })
  accountId?: string

  @Field(() => Int, { nullable: true })
  points?: number
}