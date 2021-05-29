/* eslint-disable node/no-process-env */
import { config as loadEnv } from 'dotenv';

loadEnv();

[
  'DATABASE_URL',
].forEach((req) => { if (!process.env[req]) throw Error(`The ${req} environment variable is required.`); });

const config = {
  debug: process.env.NODE_ENV !== 'production',
  auth: {
    secret: process.env.AUTH_SECRET!,
    audience: process.env.AUTH_AUDIENCE!,
  },
};

export default config;