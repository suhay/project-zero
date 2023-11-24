import { Suspense } from "react";

import Head from "next/head";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const { title, author, coverImage, body } = post;

  return (
    <div>
      <article className="mb-32 space-y-5 mt-20 flex justify-center items-center flex-col">
        <Head>
          <title>{title}</title>
        </Head>
        <header className="md:w-168 md:px-0 px-10">
          <h1 className="text-4xl font-Roboto">{title}</h1>
          <span className="font-Roboto">By: {author?.name}</span>
        </header>
        {coverImage && (
          <Image alt="" src={coverImage} width={1024} height={675} />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <div
            className="flex-col space-y-4 font-Source-Serif text-xl text-slate-900 md:w-168 md:px-0 px-10"
            dangerouslySetInnerHTML={{ __html: body.html }}
          />
        </Suspense>
      </article>
    </div>
  );
}
