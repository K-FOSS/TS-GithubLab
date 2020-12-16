// src/Utils/Github.ts
import { graphql } from '@octokit/graphql';
import { createTokenAuth } from '@octokit/auth';

const auth = createTokenAuth(process.env.GH_TOKEN);

const githubGQL = graphql.defaults({
  request: {
    hook: auth.hook,
  },
});

export { githubGQL };
