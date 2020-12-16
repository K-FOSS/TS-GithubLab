// src/Library/Config.ts
export interface Config {
  /**
   * Address to bind to. (Only needed when not running in container)
   *
   * Default: `0.0.0.0`
   */
  bindHost: string;

  /**
   * Port to bind to.
   *
   * Default: `8080`
   */
  bindPort: string;

  /**
   * Redis Job Que & Cache Settings
   */
  redis: {
    /**
     * Host of the redis server
     *
     * Default: `Redis`
     */
    host: string;
  };
}

export const config: Config = {
  bindHost: process.env.HOST || '0.0.0.0',
  bindPort: process.env.PORT || '8082',

  redis: {
    host: process.env.REDIS_HOST || 'Redis',
  },
};
