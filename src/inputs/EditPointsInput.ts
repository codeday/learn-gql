import { InputType, Field, Int } from 'type-graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class EditPointsInput {
  @Field(() => String, { nullable: true })
  AccountId?: string

  @Field(() => Int, { nullable: true })
  Points?: number
}