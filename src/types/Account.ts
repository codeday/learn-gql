import {
  ObjectType, Field, Authorized, Int,
} from 'type-graphql';
import { Container } from 'typedi';
import { AuthRole } from '../context';

@ObjectType()
export class Account {
  // Metadata
  @Field(() => Int)
  id: number

  @Field(() => String)
  accountId: string

  @Field(() => Int)
  points: number

  projects?: CompletedProject[] | null

  @Field(() => [CompletedProject], { name: 'completedProjects' })
  async fetchProjects(): Promise<CompletedProject[]> {
    if (this.projects) return this.projects;
    return Container.get(PrismaClient).completed_projects.findMany({ where: { completedProjects: { some: { id: this.accountId } } } });
  }

  lessons?: CompletedLesson[] | null

  @Field(() => [CompletedLesson], { name: 'completedLessons' })
  async fetchLessons(): Promise<CompletedLesson[]> {
    if (this.projects) return this.projects;
    return Container.get(PrismaClient).completed_lessons.findMany({ where: { students: { some: { id: this.accountId } } } });
  }
}
