// src/Library/Logger.ts
import { Service } from 'typedi';
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.cli(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console({}),
  ],
});

@Service()
export class LoggerController {
  /**
   * Starts a GitHub Actions Logging Group.
   * @param groupName Friendly name of the grouped messages
   */
  public startGroup(groupName: string): void {
    logger.info(`::group::${groupName}`);
  }

  /**
   * Ends the latest GitHub Logging Group
   */
  public endGroup(): void {
    logger.info(`::endgroup::`);
  }
}
