import {
  ObjectType, Field, Int,
} from 'type-graphql';
import { Container } from 'typedi';
import { PrismaClient, Prisma } from '@prisma/client';
import { CompletedLesson } from './CompletedLesson';
import { CompletedTrack } from './CompletedTrack';

@ObjectType()
export class Account {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  accountId: string

  @Field(() => Int)
  points: number

  CompletedTracks?: CompletedTrack[] | null

  @Field(() => [CompletedTrack], { name: 'CompletedTracks' })
  async fetchTracks(): Promise<Prisma.CompletedTrack[]> {
    if (this.CompletedTracks) return this.CompletedTracks;
    return Container.get(PrismaClient).completedTracks.findMany({ where: { accountId: this.accountId } });
  }

  CompletedLessons?: CompletedLesson[] | null

  @Field(() => [CompletedLesson], { name: 'CompletedLessons' })
  async fetchLessons(): Promise<Prisma.CompletedLesson[]> {
    if (this.CompletedLessons) return this.CompletedLessons;
    return Container.get(PrismaClient).completedLessons.findMany({ where: { accountId: this.accountId } });
  }
}
