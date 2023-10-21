import { DateTime } from "luxon";

export type Post = {
  slug: string;
  title: string;
  author?: {
    name: string;
  };
  date: DateTime;
  content?: string;
  [key: string]: any;
};
