import { Plugin } from 'unified';
import { visit, SKIP } from 'unist-util-visit';
import { Element, Root } from 'hast';

export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // <pre><code class="language-xxx">...</code></pre>
      // 1. 找到 pre 元素
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0]?.tagName === 'code'
      ) {
        const codeNode = node.children[0];
        const nodeClassName = codeNode.properties?.className?.toString() || '';
        const lang = nodeClassName.split('-')[1];

        const cloneCode: Element = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          properties: node.properties
        };

        // 修改原来的 pre 标签 -> div 标签
        node.tagName = 'div';
        // node.properties = node.position || {}
        // node.properties.className = nodeClassName
        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          cloneCode
        ];
      }

      return SKIP;
    });
  };
};
