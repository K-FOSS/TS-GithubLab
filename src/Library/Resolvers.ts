// src/Library/Resolvers.ts
/* eslint-disable @typescript-eslint/ban-types */
// src/Library/Resolvers.ts
import { GraphQLSchema } from 'graphql';
import { buildSchema, NonEmptyArray, ResolverData } from 'type-graphql';
import { findModuleFiles } from '../Utils/moduleFileFinder';
import { Context } from './Context';

type ResolverModule = { [key: string]: Function };

/**
 * Get all resolvers functions within the Modules folder
 *
 * @returns Promise resolving to all exported classes within Resolver modules within `src/Modules`
 */
export async function getResolvers(): Promise<Function[]> {
  const resolverModules = await findModuleFiles<ResolverModule>(
    /.*Resolver\.ts/,
  );

  return resolverModules.flatMap((resolverModule) =>
    Object.values(resolverModule),
  );
}

/**
 * Build a GraphQL schema with the provided resovlers
 * @param resolvers Array of `type-graphql` resolvers
 *
 * @returns Promise resolving to the created GraphQL schema
 */
export async function buildGQLSchema(
  resolvers: Function[],
): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: resolvers as NonEmptyArray<Function>,
    container: ({ context }: ResolverData<Context>) => context.container,
  });
}
