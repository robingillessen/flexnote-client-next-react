// contentlayer.config.js
import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    publishedAt: {
      type: "date",
      required: true
    },
    updatedAt: {
      type: "date"
    },
    description: {
      type: "string",
      required: true
    },
    image: {
      type: "string"
    },
    isPublished: {
      type: "boolean",
      required: true
    },
    author: {
      type: "string",
      required: true
    },
    tags: {
      type: "list",
      of: {
        type: "string"
      }
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/info/${doc._raw.flattenedPath}`
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    toc: {
      type: "json",
      resolve: async (doc) => {
        const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
              text: content,
              slug: content ? slugger.slug(content) : void 0
            };
          }
        );
        return headings;
      }
    }
  }
}));
var codeOptions = {
  theme: "github-dark",
  grid: false
};
var contentlayer_config_default = makeSource({
  /* options */
  contentDirPath: "content",
  documentTypes: [Blog],
  disableCache: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"]
            // Voegt de 'heading-anchor' class toe aan elke heading
          }
        }
      ],
      [rehypePrettyCode, codeOptions]
    ]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-XJVTWLJZ.mjs.map
