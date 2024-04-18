import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { 
  checkUser, 
  createJwt,
  createUser, 
  deleteAllUsers, 
  deleteUser, 
  getAllUsers, 
  login 
} from "../controllers/index.ts";

const router = new Router();

router
  .get("/users", async (context: RouterContext<string>) => {
    const userArray = await getAllUsers();
    return context.response.body = {count: userArray.length, users: userArray };
  })
  .delete("/users", async (context: RouterContext<string>) => {   
    return context.response.body = await deleteAllUsers();
  });

router.delete("/users/:_id", async (context: RouterContext<string>) => {   
  return context.response.body = await deleteUser({ _id: context.params._id }); 
});

router.post("/users/login", async (context: RouterContext<string>) => {   
  const { email, password } = await context.request.body().value;  
  if(!email || !password) {
    const missingFields: Array<string> = [];
    if(!email) missingFields.push("email");
    if(!password) missingFields.push("password");
    return context.response.body = `missing fields: ${missingFields}`;
  }
  const userExists = await checkUser({ email });
  if(!userExists) return context.response.body = `No user with email ${email}`;
  const loginResponse = await login({ email, password });
  if(!loginResponse) return context.response.body = 'error';
  const jwt = await createJwt(email)
  context.cookies.set("token", jwt);
  return context.response.body = 'success';

});

router.post("/users/create", async (context: RouterContext<string>) => {   
  const { name, email, password } = await context.request.body().value;
  if(!name || !email || !password) {
    const missingFields: Array<string> = [];
    if(!name) missingFields.push("name");
    if(!email) missingFields.push("email");
    if(!password) missingFields.push("password");
    return context.response.body = `missing fields: ${missingFields}`;
  }
  const userExists = await checkUser({ email });
  if(userExists) {
    context.response.status = 409;
    return context.response.body = {"message": `${email} already in use`};
  }
  const res = await createUser({name, email, password});
  context.response.body = JSON.stringify(res);
})

export { router as userRoutes };