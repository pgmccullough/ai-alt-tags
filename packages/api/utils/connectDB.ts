import { MongoClient } from "./deps.ts";
//const url = 'mongodb://127.0.0.1:27017'; // running locally
const url = 'mongodb://mongo:27017';
//const url = 'mongodb://mongo:27017?authSource=admin&directConnection=true';
export const client = new MongoClient(url);
