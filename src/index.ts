import { createApp } from './app';
import { readConfig } from './config';


async function main () {
  const config = readConfig();
  const app = createApp(config);
  const port = config.port;

  await new Promise<void>((resolve, reject) => {
    app.listen(port, error => error ? reject(error) : resolve());
  });
  console.log(`Listening on port ${port}`);
}

main().catch(error => {
  console.error('Fatal: ', error);
  process.exit(1);
});
