import {
  Resolver, Authorized, Query, Mutation, Arg, Ctx,
} from 'type-graphql';
import { PrismaClient, Prisma } from '@prisma/client';
import { Inject, Service } from 'typedi';
import { Context, AuthRole } from '../context';
import { Account, CompletedTrack, CompletedLesson } from '../types';
import { AddCompletedLessonInput, AddCompletedTrackInput,
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
    });
  }

  @Query(() => Account)
  async account(
    @Arg('accountId', {nullable: false}) accountId?: string,
  ): Promise<Account> {
    return <Promise<Account>><unknown> this.prisma.points.findFirst({ where: { accountId } });
  }

  //@Authorized(AuthRole.ADMIN)
  @Mutation(() => CompletedLesson)
  async addCompletedLesson(
    @Arg('data') addCompletedLessonInput: AddCompletedLessonInput,
  ): Promise<Prisma.completedLessons> {
    return this.prisma.completedLessons.create({ data: addCompletedLessonInput });
  }

  //@Authorized(AuthRole.ADMIN)
  @Mutation(() => CompletedTrack)
  async addCompletedTrack(
    @Arg('data') addCompletedTrackInput: AddCompletedTrackInput,
  ): Promise<Prisma.completedTracks> {
    return this.prisma.completedTracks.create({ data: addCompletedTrackInput });
  }

  //@Authorized(AuthRole.ADMIN)
  @Mutation(() => Account)
  async addUserToPoints(
    @Arg('data') addUserToPointsInput: AddUserToPointsInput,
  ): Promise<Prisma.points> {
    return this.prisma.points.create({ data: addUserToPointsInput });
  }

  // TODO: add check to see if they are in points db, if they are, edit row, if not create.
  //@Authorized(AuthRole.ADMIN)
  @Mutation(() => Account)
  async editPoints(
    @Arg('accountId') accountId: string,
    @Arg('data') editPointsInput: EditPointsInput,
  ): Promise<Prisma.points> {
    return this.prisma.points.update({
      where: { accountId },
      data: editPointsInput,
    });
  }
}