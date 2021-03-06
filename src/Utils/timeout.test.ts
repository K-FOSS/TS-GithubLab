// src/Utils/timeout.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { assert } from '@sindresorhus/is';
import Container from 'typedi';
import { LoggerController } from '../Library/Logger';
import './Setup';
import { timeout } from './timeout';

export class TimoutTestSuite extends TestSuite {
  public testName = 'Timeout Test Suite';

  public async test(): Promise<void> {
    const loggerController = Container.get(LoggerController);

    loggerController.startGroup('Timeout Test');

    async function runTimeout(ms: number): Promise<number> {
      const startTimeoutTime = Date.now();
      await timeout(ms);
      const endTimeoutTime = Date.now();

      return endTimeoutTime - startTimeoutTime - ms;
    }

    const timings = [50, 55, 60, 65];

    await Promise.all(
      timings.map(async (time) => {
        const result = await runTimeout(time);

        return assert.inRange(result, 5);
      }),
    );

    loggerController.endGroup();
  }
}
