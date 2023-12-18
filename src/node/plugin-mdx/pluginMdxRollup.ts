import pluginMdx from '@mdx-js/rollup';
import remarkPluginGFM from 'remark-gfm';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginFrontmatter from 'remark-frontmatter';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
// import rehypeHighlight from 'rehype-highlight';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';

export function pluginMdxRollup() {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      remarkPluginMDXFrontMatter
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper
      // [rehypeHighlight, { aliases: { javascript: 'custom-script' } }]
    ]
  });
}
