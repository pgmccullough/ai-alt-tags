import { main, client } from '../models/user.model.ts';

const getAllUsers = async () => {
  const { User } = await main();
  const users = await User.find();
  client.close();
  return users;
}

const makeDummyUser = async () => {
  const { User } = await main();
  await User.insertOne({
    name: "Patrick McCullough",
    email: "patrick.g.mccullough@gmail.com",
    role: "admin",
    verified: true,
    password: "dog",
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const users = await User.find({}).toArray();
  await User.deleteMany({});
  client.close();
  return users;
}

export { getAllUsers, makeDummyUser };