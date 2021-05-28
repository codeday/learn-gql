import {
  Resolver, Authorized, Query, Mutation, Arg, Ctx,
} from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Inject, Service } from 'typedi';
import { Context, AuthRole } from '../context';
import { Account } from '../types';
import { AddCompletedLessonInput, AddCompletedProjectInput } from '../inputs';

@Service()
@Resolver(Account)
export class StudentResolver {
  @Inject(() => PrismaClient)
  private readonly prisma : PrismaClient;


  @Query(() => [Account])
  async accounts(
    @Arg('skip', { nullable: true }) skip?: number,
    @Arg('take', { nullable: true }) take?: number,
  ): Promise<Account[]> {
    return <Promise<Account[]>><unknown> this.prisma.points.findMany({
      skip,
      take: take || 25,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Query(() => Account)
  async account(
    @Arg('AccountId', {nullable: false}) AccountId?: string,
  ): Promise<Account> {
    return <Promise<Account>><unknown> this.prisma.points.findFirst({ where: { AccountId } });
  }

  //@Authorized()
  @Mutation(() => CompletedLesson)
  async addCompletedLesson(
    @Arg('data', () => addCompletedLessonInput) data: AddCompletedLessonInput,
  ): Promise<CompletedLesson> {
    return this.prisma.completed_lessons.create({ data: addCompletedLessonInput });
  }

  //@Authorized()
  @Mutation(() => CompletedProject)
  async addCompletedProject(
    @Arg('data', () => addCompletedProjectInput) data: AddCompletedProjectInput,
  ): Promise<CompletedLesson> {
    return this.prisma.completed_projects.create({ data: addCompletedProjectInput });
  }

}