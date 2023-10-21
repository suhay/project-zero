import { Suspense } from "react";

import { Metadata } from "next";
import Head from "next/head";

import { getAllPosts, getPostBySlug } from "@/src/utils/getPosts";
import markdownToHtml from "@/src/utils/markdownToHtml";

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ["title"]);

  return {
    title: post.title,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);

  const content = await markdownToHtml(post.content || "");
  const title = `${post.title}`;

  return (
    <article className="mb-32">
      <Head>
        <title>{title}</title>
      </Head>
      <h2>{title}</h2>
      <span>By: {post.author?.name}</span>
      <Suspense fallback={<div>Loading...</div>}>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </Suspense>
    </article>
  );
}
