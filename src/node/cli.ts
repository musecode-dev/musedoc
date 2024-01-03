import { resolve } from 'path';
import { cac } from 'cac';
import { createDevServer } from './dev';
import { build } from './build';
import { resolveConfig } from './config';
import { preview } from './preview';

// const version = require('../../package.json').version;

const cli = cac('musedoc').version('0.0.1').help();

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  // console.log('dev', resolve(root), process.cwd());
  // root = root ? resolve(root) : process.cwd();
  const createServer = async () => {
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer();
});

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      root = resolve(root);
      const config = await resolveConfig(root, 'build', 'production');
      await build(root, config);
    } catch (e) {
      console.log(e);
    }
  });

cli
  .command('preview [root]', 'preview production build')
  .option('--port <port>', 'port to use for preview server')
  .action(async (root: string, { port }: { port: number }) => {
    try {
      root = resolve(root);
      await preview(root, { port });
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
