import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { main, client } from '../models/user.model.ts';
import { ObjectId } from '../utils/deps.ts';

const getAllUsers = async () => {
  const { User } = await main();
  const users = await User.find();
  client.close();
  return users;
}

const createUser = async ({ name, email, password } : 
  {name: string, email: string, password: string}
) => {
  const hash = await bcrypt.hash(password);
  const { User } = await main();
  const { insertedId } = await User.insertOne({
    name,
    email,
    role: "subscriber",
    verified: false,
    apiKey: crypto.randomUUID(),
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const newUser = await User.findOne({_id: new ObjectId(insertedId)});
  client.close();
  return newUser;
}

export { getAllUsers, createUser };