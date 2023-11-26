import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { Card } from "~/Card";

export function Feed() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <section className="py-8 container mx-auto w-screen">
      <h1 className="mb-8 text-left text-2xl font-black">From the community</h1>
      <div className="flex gap-x-5">
        {posts.map((post, idx) => (
          <Card.Simple
            key={idx}
            img={{
              src: post.coverImage ?? "",
              alt: "",
            }}
            href={post.url}
            title={post.title}
            description={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
