// src/Modules/Repository/RepositoryResolver.ts
import { Repository as GHRepo } from '@octokit/graphql-schema';
import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { githubGQL } from '../../Library/Github';
import { timeout } from '../../Utils/timeout';
import { Language } from '../Languages/Language';
import { Repository } from './Repository';

type RepoInfo = Pick<
  GHRepo,
  'id' | 'repositoryTopics' | 'primaryLanguage' | 'languages' | 'name'
>;

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
    @Arg('repo') repo: string,
  ): Promise<Repository> {
    const result = await githubGQL<{ repository: RepoInfo }>(
      `query repository($owner: String!, $repo: String!) {
      repository(owner:$owner, name:$repo) {
        id

        name
    
        repositoryTopics(first: 5) {
          nodes {
            id
            topic {
              id
              name
              
              
            }
            url
            
            resourcePath
          }
        }
        
        primaryLanguage {
          id
          
          name
        }
        
      
      languages(first: 5) {
        edges {
          size
          
          node {
            name
            
            id
          }
        }
        totalSize
      }
      }
    }`,
      {
        owner,
        repo,
      },
    );

    return {
      name: result.repository.name,
      languages: result.repository.languages?.edges?.map((language) =>
        language
          ? {
              name: language.node.name,
              id: language.node.id,
              percentage: (
                (language.size / result.repository.languages!.totalSize) *
                100
              ).toFixed(2),
            }
          : undefined,
      ) as Language[],
    };
  }
}
