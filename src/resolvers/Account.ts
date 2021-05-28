import {
  Resolver, Authorized, Query, Mutation, Arg, Ctx,
} from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Inject, Service } from 'typedi';
import { Context, AuthRole } from '../context';
import { Account } from '../types';

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
}