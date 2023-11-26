import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

export const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: {
      type: "string",
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    author: {
      type: "nested",
      of: Author,
      required: true,
    },
    date: { type: "date", required: true },
    excerpt: { type: "string" },
    tags: { type: "enum", options: ["SuccessStories", "LocalPlaces"] },
    coverImage: { type: "string" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: "_posts", documentTypes: [Post] });
