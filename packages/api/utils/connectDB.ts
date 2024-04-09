import { MongoClient } from "./deps.ts";

// const client = new MongoClient();
// await client.connect('mongodb://localhost:27017');

// export const db = client.database('ai_alt_tags');

const url = 'mongodb://localhost:27017';
export const client = new MongoClient(url);