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

  @Authorized(AuthRole.ADMIN, AuthRole.STUDENT)
  @StudentOnlySelf('where')
  @Query(() => Account, { nullable: true })
  async account(
    @Ctx() { auth }: Context,
    @Arg('where', () => IdOrUsernameInput, { nullable: true }) where?: IdOrUsernameInput,
  ): Promise<Account | null> {
    return this.prisma.student.findUnique({ where: where?.toQuery() || auth.toWhere() });
  }

  @Authorized(AuthRole.ADMIN)
  @Mutation(() => Student)
  async createStudent(
    @Arg('data', () => StudentCreateInput) data: StudentCreateInput,
  ): Promise<PrismaStudent> {
    return this.prisma.student.create({ data: data.toQuery() });
  }

  @Authorized(AuthRole.APPLICANT_STUDENT)
  @Mutation(() => Student)
  async applyStudent(
    @Ctx() { auth }: Context,
    @Arg('data', () => StudentApplyInput) data: StudentApplyInput,
  ): Promise<PrismaStudent> {
    if (!auth.username) throw Error('Username is required in token for student applicants.');
    return this.prisma.student.create({
      data: {
        ...data.toQuery(),
        username: auth.username,
      },
    });
  }

  @Authorized(AuthRole.ADMIN, AuthRole.STUDENT)
  @StudentOnlySelf('where')
  @Mutation(() => Student)
  async editStudent(
    @Ctx() { auth }: Context,
    @Arg('data', () => StudentEditInput) data: StudentEditInput,
    @Arg('where', () => IdOrUsernameInput, { nullable: true }) where?: IdOrUsernameInput,
  ): Promise<PrismaStudent> {
    if ((data.username || data.partnerCode || data.status || data.weeks) && !auth.isAdmin) {
      throw Error('You do not have permission to edit restricted fields.');
    }

    return this.prisma.student.update({
      where: where?.toQuery() || auth.toWhere(),
      data: data.toQuery(),
    });
  }

  @Authorized(AuthRole.ADMIN)
  @Mutation(() => Boolean)
  async deleteStudent(
    @Arg('where', () => IdOrUsernameInput) where: IdOrUsernameInput,
  ): Promise<boolean> {
    await this.prisma.student.delete({ where });
    return true;
  }

  @Authorized(AuthRole.STUDENT)
  @Mutation(() => Student)
  async cancelStudentApplication(
    @Ctx() { auth }: Context,
  ): Promise<PrismaStudent> {
    return this.prisma.student.update({
      where: auth.toWhere(),
      data: { status: StudentStatus.CANCELED },
    });
  }
}