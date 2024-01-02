import os from 'os';
import { expect, describe, test } from 'vitest';
import babelPluginIsland from '../babel-plugin-island';
import type { TransformOptions } from '@babel/core';
import { transformAsync } from '@babel/core';
import { MASK_SPLITTER } from '../constants';

const isWindows = os.platform() === 'win32';

describe('babel-plugin-island', () => {
  const ISLAND_PATH = '../Comp/index';
  const prefix = isWindows ? 'C:' : '';
  const IMPORTER_PATH = prefix + '/User/project/test.tsx';
  const babelOptions: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginIsland]
  };

  test('Should compile jsx identifier', async () => {
    const code = `import Aside from '${ISLAND_PATH}'; export default function App () { return <Aside __island />; }`;

    const result = await transformAsync(code, babelOptions);

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });

  test('Should compile jsx member expression', async () => {
    const code = `import A from '${ISLAND_PATH}'; export default function App() { return <A.B __island />; }`;

    const result = await transformAsync(code, babelOptions);

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });
});
