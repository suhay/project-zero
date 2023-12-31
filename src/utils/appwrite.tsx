import { Client, Account, Functions, Databases, Graphql } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL ?? "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");

export const account = new Account(client);

export const databases = new Databases(client);

export const graphql = new Graphql(client);

export const functions = new Functions(client);
