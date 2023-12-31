import { describe, expect, test } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import shiki from 'shiki';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginShiki } from '../plugin-mdx/rehypePlugins/shiki';
import { remarkPluginToc } from '../plugin-mdx/remarkPlugins/toc';

describe('Markdown compile cases', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'nord' })
    })
    .use(rehypeStringify);

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class="language-js"><span class="lang">js</span><pre class="shiki nord" style="background-color: #2e3440ff" tabindex="0"><code><span class="line"><span style="color: #D8DEE9">console</span><span style="color: #ECEFF4">.</span><span style="color: #88C0D0">log</span><span style="color: #D8DEE9FF">(</span><span style="color: #B48EAD">123</span><span style="color: #D8DEE9FF">)</span><span style="color: #81A1C1">;</span></span>
      <span class="line"></span></code></pre></div>"
    `);
  });

  test('Compline TOC', async () => {
    const mdContent = `# h1

## h2 \`code\`

### h3 [link](https://musecode.dev)

#### h4

##### h5
`;
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkStringify)
      .use(remarkPluginToc);
    const result = remarkProcessor.processSync(mdContent);
    expect(result.value.toString().replace(mdContent, ''))
      .toMatchInlineSnapshot(`
      "
      export const toc = [
        {
          "id": "h2-code",
          "text": "h2 code",
          "depth": 2
        },
        {
          "id": "h3-link",
          "text": "h3 link",
          "depth": 3
        },
        {
          "id": "h4",
          "text": "h4",
          "depth": 4
        }
      ]
      "
    `);
  });
});
