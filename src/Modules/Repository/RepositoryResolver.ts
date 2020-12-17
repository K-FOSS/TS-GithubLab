/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/Modules/Repository/RepositoryResolver.ts
import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from './getRepositoryData';
import { Repository } from './Repository';

@Service()
@Resolver()
export class RepositoryResolver {
  @Query(() => String)
  public helloWorld(): 'helloWorld' {
    return 'helloWorld';
  }

  @Query(() => Repository)
  public async queryRepository(
    @Arg('owner') owner: string,
    @Arg('repo') repoName: string,
  ): Promise<Repository> {
    return getRepository({
      owner,
      repoName,
    });
  }
}
