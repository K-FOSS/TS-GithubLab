// src/Library/Context.ts
import { FastifyRequest } from 'fastify';
import { Container } from 'typedi';

export interface Context {
  requestId: string;

  container: Container;
}

interface ContextRequest {
  request: FastifyRequest;
}

/**
 * Get the GraphQL Context
 */
export function getGQLContext({ request }: ContextRequest): Context {
  const container = Container.of(request.id as string);

  const context = { requestId: request.id as string, container };
  container.set('context', context);

  return context;
}
