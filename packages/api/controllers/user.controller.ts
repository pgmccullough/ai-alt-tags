import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { main, client } from '../models/user.model.ts';
import { ObjectId } from '../utils/deps.ts';
import { create, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const getAllUsers = async () => {
  const { User } = await main();
  const users = await User.find().toArray();
  client.close();
  return users;
}

const checkUser = async({ email } :
{ email: string }
) => {
  const { User } = await main();
  const userExists = await User.find({ email }).toArray();
  return (!!userExists.length);
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

const deleteAllUsers = async () => {
  const { User } = await main();
  await User.deleteMany({});
  return {};
}

const deleteUser = async ({ _id }: {_id: string}) => {
  const { User } = await main();
  const match = await User.find({ _id: new ObjectId(_id)}).toArray();
  if(!match.length) return { message: `No user with id ${_id}`};
  try {
    await User.deleteOne({ _id: new ObjectId(_id)});
    return { deleted: _id };
  } catch(_err) {
    return { message: `Unknown error`};
  }
}

const login = async ( { email, password } : { email: string, password: string } ) => {
  const { User } = await main();
  const match = await User.find({ email }).toArray();
  const hash = match[0].password;
  const pwResult = await bcrypt.compare(password, hash);
  return pwResult;
}

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const createJwt = async (email: string) => {
  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    { email },
    key
  )
  return jwt;
}

export { 
  checkUser, 
  createJwt,
  createUser, 
  deleteAllUsers, 
  deleteUser, 
  getAllUsers,
  login
};