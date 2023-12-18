import { resolve, join } from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = resolve(__dirname, '../e2e/playground/basic');

const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  // ensure after build
  if (!fse.existsSync(resolve(__dirname, '../dist'))) {
    // ensure build command
    execa.execaCommandSync('pnpm build', {
      cwd: resolve(__dirname, '../')
    });
  }

  execa.execaCommandSync('npx playwright install', {
    cwd: join(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  execa.execaCommandSync('pnpm i', {
    cwd: exampleDir,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // exec dev command
  execa.execaCommandSync('pnpm dev', defaultExecaOpts);
}

prepareE2E();
