import { describe, expect, test } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringfy from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';

describe('Markdown compile cases', () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringfy)
    .use(rehypePluginPreWrapper);

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div><span class="lang">js</span><pre><code class="language-js">console.log(123);
      </code></pre></div>"
    `);
  });
});
