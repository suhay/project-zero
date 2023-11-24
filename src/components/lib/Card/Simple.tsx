import Image from "next/image";
import Link from "next/link";

import { LearnMore } from "~/Button/LearnMore";

export function Simple({
  img,
  href,
  title,
  description,
}: {
  img: {
    src: string;
    alt: string;
  };
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm max-w-lg">
      <Image
        src={img.src}
        alt={img.alt}
        width={100}
        height={100}
        className="h-56 w-full object-cover"
      />
      <div className="p-4 sm:p-6">
        <Link href={href}>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </Link>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description}
        </p>
        <LearnMore href={href} label="Read more" />
      </div>
    </article>
  );
}
