// src/Utils/resolvePath.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { logger } from '../Library/Logger';
import { timeout } from './timeout';

export class ResolvePathSuite extends TestSuite {
  public testName = 'Resolve Path Test Suite';

  public async test(): Promise<void> {
    logger.debug(`TODO: Resolve Path Suite`);

    await timeout(50);
  }
}
