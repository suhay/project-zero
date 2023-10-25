import { DateTime } from "luxon";

export type Post = {
  slug: string;
  title: string;
  author?: {
    name: string;
  };
  date: DateTime;
  content?: string;
  coverImage?: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
};
