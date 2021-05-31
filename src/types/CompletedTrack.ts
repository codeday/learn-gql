import {
  ObjectType, Field, Int,
} from 'type-graphql';

@ObjectType()
export class CompletedTrack {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  trackId: string

  @Field(() => String)
  accountId: string
  
}
