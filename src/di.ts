import { Container } from 'typedi';
import { PrismaClient } from '@prisma/client';
import config from './config';

export function registerDi(): void {
  Container.set(PrismaClient, new PrismaClient());
}