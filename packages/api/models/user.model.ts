import { client } from '../utils/connectDB.ts';
import { ObjectId } from '../utils/deps.ts';

interface UserSchema {
  _id?: ObjectId;
  name: string;
  email: string;
  role: "subscriber" | "admin";
  verified: boolean;
  apiKey: string,
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const main = async() => {
  await client.connect();
  const db = client.db('ai_alt_tags');
  return { User: db.collection<UserSchema>('users'), client };
}

export { client };
