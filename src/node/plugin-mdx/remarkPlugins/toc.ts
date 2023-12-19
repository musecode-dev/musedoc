import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';
import { parse } from 'acorn';
import type { Root } from 'mdast';
import { MdxjsEsm } from 'mdast-util-mdxjs-esm';

interface TocItem {
  id: string;
  text: string;
  depth: number;
}

interface ChildNode {
  type: 'link' | 'inlineCode' | 'text';
  value?: string;
  children?: ChildNode[];
}

export const remarkPluginToc: Plugin<[], Root> = () => {
  return (tree) => {
    // 初始化 toc 数组
    const toc: TocItem[] = [];

    visit(tree, 'heading', (node) => {
      if (!node.depth || !node.children) {
        return;
      }

      // h2 ~ h4
      if (node.depth > 1 && node.depth < 5) {
        const originText = (node.children as ChildNode[])
          .map((child) => {
            switch (child.type) {
              case 'link':
                return child.children?.map((c) => c.value).join('');
              default:
                return child.value;
            }
          })
          .join('');

        // 对标题文本进行规范化
        const id = slug(originText);
        toc.push({
          id,
          text: originText,
          depth: node.depth
        });
      }
    });

    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;
    tree.children.push({
      type: 'mdxjsEsm',
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        })
      }
    } as MdxjsEsm);
  };
};
