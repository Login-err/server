/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'graduation',
      },
      app: true,
      agent: false,
    },
    jwt: {
      secret: '123456',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
    },
    routerAuth: ['/login/', '/register/'],
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615045366189_3881';

  // add your middleware config here
  config.middleware = ['auth'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
