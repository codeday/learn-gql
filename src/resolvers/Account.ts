import {
  Resolver, Authorized, Query, Mutation, Arg, Ctx,
} from 'type-graphql';
import { PrismaClient, Prisma } from '@prisma/client';
import { Inject, Service } from 'typedi';
import { Context, AuthRole } from '../context';
import { Account, CompletedProject, CompletedLesson } from '../types';
import { AddCompletedLessonInput, AddCompletedProjectInput,
  EditPointsInput, AddUserToPointsInput } from '../inputs';

@Service()
@Resolver(Account)
export class AccountResolver {
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
    @Arg('data') addCompletedLessonInput: AddCompletedLessonInput,
  ): Promise<Prisma.completed_lessons> {
    return this.prisma.completed_lessons.create({ data: addCompletedLessonInput });
  }

  //@Authorized()
  @Mutation(() => CompletedProject)
  async addCompletedProject(
    @Arg('data') addCompletedProjectInput: AddCompletedProjectInput,
  ): Promise<Prisma.completed_projects> {
    return this.prisma.completed_projects.create({ data: addCompletedProjectInput });
  }

  //@Authorized()
  @Mutation(() => CompletedProject)
  async addUserToPoints(
    @Arg('data') addUserToPointsInput: AddUserToPointsInput,
  ): Promise<Prisma.points> {
    return this.prisma.completed_projects.create({ data: addUserToPointsInput });
  }

  // TODO: add check to see if they are in points db, if they are, edit row, if not create.
  // @Authorized()
  @Mutation(() => Account)
  async editPoints(
    @Arg('data') editPointsInput: EditPointsInput,
    @Arg('AccountId', { nullable: false }) AccountId?: string,
  ): Promise<Prisma.points> {
    return this.prisma.points.update({
      where: { AccountId },
      data: editPointsInput,
    });
  }
}