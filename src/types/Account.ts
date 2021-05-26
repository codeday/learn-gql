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

  @Field(() => Int)
  points: number

  projects?: PrismaProject[] | null

  @Field(() => [Project], { name: 'completedProjects' })
  async fetchProjects(): Promise<PrismaProject[]> {
    if (this.projects) return this.projects;
    return Container.get(PrismaClient).completed_projects.findMany({ where: { completedProjects: { some: { id: this.id } } } });
  }

  lessons?: PrismaLesson[] | null

  @Field(() => [Lesson], { name: 'completedLessons' })
  async fetchLessons(): Promise<PrismaProject[]> {
    if (this.projects) return this.projects;
    return Container.get(PrismaClient).completed_lessons.findMany({ where: { students: { some: { id: this.id } } } });
  }
}
