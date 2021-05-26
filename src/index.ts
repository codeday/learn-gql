import 'reflect-metadata';
import server from './server';
import { registerDi } from './di';

registerDi();
server();
