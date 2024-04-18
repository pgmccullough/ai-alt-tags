import { MongoClient } from "./deps.ts";
const url = 'mongodb://mongo:27017';
export const client = new MongoClient(url);
