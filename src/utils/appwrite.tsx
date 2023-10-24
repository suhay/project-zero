import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("652c29a1ac0a19fec480");

export const account = new Account(client);
