// src/index.ts
import './Utils/Setup';
import fastify from 'fastify';
import hyperid from 'hyperid';
import { createApolloServer } from './Library/Apollo';
import { config } from './Library/Config';
import { logger, LogMode } from './Library/Logger';

if (process.env.NODE_ENV !== 'production') {
  const { config } = await import('dotenv');

  config();
}

/**
 * Fastify Web Server
 */
const webServer = fastify({
  genReqId: () => hyperid().uuid,
});

logger.log(LogMode.INFO, 'Creating Apollo Server');

/**
 * Apollo GraphQL Server
 */
const gqlServer = await createApolloServer();

await webServer.register(gqlServer.createHandler());

logger.log(LogMode.INFO, 'API Server setup.');

await webServer.listen(config.bindPort, config.bindHost);

logger.log(LogMode.INFO, `Listening on port ${config.bindPort}`);

export {};
