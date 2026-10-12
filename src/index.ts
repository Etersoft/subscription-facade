import { createApp } from './app';
import { readConfig } from './config';


async function main () {
  const config = readConfig();
  const app = createApp(config);
  const { host, port } = config;

  await new Promise<void>((resolve, reject) => {
    const callback = (error?: Error) => error ? reject(error) : resolve();
    if (host) {
      app.listen(port, host, callback);
    } else {
      app.listen(port, callback);
    }
  });
  console.log(`Listening on ${host || '*'}:${port}`);
}

main().catch(error => {
  console.error('Fatal: ', error);
  process.exit(1);
});
