import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'node:path';
import { Config } from './config';
import { mailingAction } from './mailingAction';


export interface AppOptions {
  templatesDir?: string;
}

export function createApp (config: Config, options: AppOptions = {}): express.Express {
  const templatesDir = options.templatesDir ?? join(__dirname, '..', '..', 'templates');
  const app = express();
  app.engine('hbs', engine({
    defaultLayout: false,
    extname: '.hbs',
    partialsDir: templatesDir
  }));
  app.set('view engine', 'hbs');
  app.enable('view cache');
  app.set('views', templatesDir);

  app.get('/subscribe', mailingAction('subscribe', config.backend, config.mailingId));
  app.get('/unsubscribe', mailingAction('unsubscribe', config.backend, config.mailingId));
  return app;
}
