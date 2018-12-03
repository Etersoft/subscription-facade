// tslint:disable:no-console
import * as express from 'express';
import * as lodash from 'lodash';
import { existsSync } from 'fs';
import { join } from 'path';
import * as expressHandlebars from 'express-handlebars';
import { subscribe } from './subscribe';
import { unsubscribe } from './unsubscribe';


async function main () {
  const app = express();
  app.engine('hbs', expressHandlebars({
    extname: '.hbs',
    partialsDir: join(__dirname, '..', 'templates')
  }));
  app.set('view engine', 'hbs');
  app.enable('view cache');
  app.set('views', join(__dirname, '..', 'templates'));
  const config = readConfig();
  setupRoutes(config, app);

  const port = config.port;
  app.on('error', (error: any) => {
    console.error(error);
    process.exit(1);
  });

  await new Promise((resolve, reject) => {
    app.listen(port, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  console.log(`Listening on port ${port}`);
}

function readConfig (): any {
  const baseConfig = require('../config.default.json');

  if (existsSync(join(__dirname, '..', 'config.json'))) {
    const userConfig = require('../config.json');
    return lodash.merge(baseConfig, userConfig);
  }

  return baseConfig;
}

function setupRoutes (config: any, app: express.Express) {
  app.get('/subscribe', subscribe(config.backend, config.mailingId));
  app.get('/unsubscribe', unsubscribe(config.backend, config.mailingId));
}

main().catch(error => {
  console.error('Fatal: ', error);
  process.exit(1);
});
