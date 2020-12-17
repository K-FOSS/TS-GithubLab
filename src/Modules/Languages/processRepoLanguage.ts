// src/Modules/Languages/processRepoLanguage.ts
import { LanguageEdge } from '@octokit/graphql-schema';
import { Maybe } from 'type-graphql';
import { Language } from './Language';

const consoleTimeLabel = 'repoLanguage';

export function processRepoLanguages(
  repoLanguageData: Maybe<LanguageEdge>[],
  totalRepoSize: number,
): Language[] {
  console.time(consoleTimeLabel);

  const languageMap = repoLanguageData
    .map((languageData) => {
      if (!languageData) {
        return [];
      }

      return {
        name: languageData.node.name,
        id: languageData.node.id,
        percentage:
          Math.round(
            ((languageData.size / totalRepoSize) * 100 + Number.EPSILON) * 100,
          ) / 100,
      };
    })
    .flat();
  console.timeEnd(consoleTimeLabel);

  return languageMap;
}
