import { InputType, Field, Int } from 'type-graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class EditPointsInput {
  @Field(() => Int, { nullable: true })
  points?: number
}