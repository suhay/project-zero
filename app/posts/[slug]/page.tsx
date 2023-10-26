import { Suspense } from "react";

import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

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
    "coverImage",
  ]);

  const content = await markdownToHtml(post.content || "");
  const title = `${post.title}`;

  return (
    <div>
      <article className="mb-32 space-y-5 mt-20 flex justify-center items-center flex-col">
        <Head>
          <title>{title}</title>
        </Head>
        <header className="md:w-168 md:px-0 px-10">
          <h1 className="text-4xl font-Roboto">{title}</h1>
          <span className="font-Roboto">By: {post.author?.name}</span>
        </header>
        {post.coverImage && (
          <Image alt="" src={post.coverImage} width={1024} height={675} />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <div
            className="flex-col space-y-4 font-Source-Serif text-xl text-slate-900 md:w-168 md:px-0 px-10"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Suspense>
      </article>
    </div>
  );
}
