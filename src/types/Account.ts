import {
  ObjectType, Field, Int,
} from 'type-graphql';
import { Container } from 'typedi';
import { PrismaClient } from '@prisma/client';
import { CompletedLesson } from './CompletedLesson';
import { CompletedProject } from './CompletedProject';

@ObjectType()
export class Account {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  AccountId: string

  @Field(() => Int)
  Points: number

  CompletedProjects?: CompletedProject[] | null

  @Field(() => [CompletedProject], { name: 'CompletedProjects' })
  async fetchProjects(): Promise<CompletedProject[]> {
    if (this.projects) return this.projects;
    return Container.get(PrismaClient).completed_projects.findMany({ where: { AccountId: this.AccountId } });
  }

  CompletedLessons?: CompletedLesson[] | null

  @Field(() => [CompletedLesson], { name: 'CompletedLessons' })
  async fetchLessons(): Promise<CompletedLesson[]> {
    if (this.CompletedLessons) return this.CompletedLessons;
    return Container.get(PrismaClient).completed_lessons.findMany({ where: { AccountId: this.AccountId } });
  }
}
