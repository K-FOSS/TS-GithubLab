// src/Modules/Repository/getRepositoryData.ts
import { Repository as GHRepo } from '@octokit/graphql-schema';
import { githubGQL } from '../../Library/Github';
import { processRepoLanguages } from '../Languages/processRepoLanguage';
import { Repository } from './Repository';

interface GetRepoDataOpts {
  repoName: string;

  owner: string;
}

type RepoInfo = Pick<
  GHRepo,
  'id' | 'repositoryTopics' | 'primaryLanguage' | 'languages' | 'name'
>;

export async function getRepository({
  owner,
  repoName,
}: GetRepoDataOpts): Promise<Repository> {
  const { repository } = await githubGQL<{ repository: RepoInfo }>(
    `query repository($owner: String!, $repoName: String!) {
    repository(owner:$owner, name:$repoName) {
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
      repoName,
    },
  );

  if (!repository.languages?.edges || !repository.languages.totalSize) {
    throw new Error('Invalid GitHub data');
  }

  return {
    name: repository.name,
    languages: processRepoLanguages(
      repository.languages.edges,
      repository.languages.totalSize,
    ),
  };
}
