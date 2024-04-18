import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { checkApi, openAIReq, scanImage, verifyJwt } from "./controllers/index.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { userRoutes } from "./routes/user.route.ts";
config({export: true});

const router = new Router();

const verify = async (context: RouterContext<string>, next: () => Promise<unknown>) => {
  const headers: Headers = context.request.headers;
  const { pathname } = context.request.url;
  const apiKey = context.request.url.searchParams.get('api_key');
  const validApiKey = await checkApi(apiKey);
  const unprotectedRoutes = ['/users/login', '/users/create'];
  if(unprotectedRoutes.includes(pathname)) return await next();
  context.state.user = await verifyJwt(context);
  if(context.state.user) return await next();
  if(validApiKey) return await next();
  if(headers.get("origin")==="https://ai-alt-tags.com") return await next();
  if(headers.get("origin")==="http://localhost:8000") return await next();
  if(!headers.get('AI-Alt-API-Key')||(Deno.env.get("TEMP_UUID")!==headers.get('AI-Alt-API-Key'))) {
    context.response.status = 401;
    return context.response.body = "Requests must be accompanied by a valid api key."
  }
  await next();
}

router
  .get("/", async (context: RouterContext<string>) => {   
    context.response.body = JSON.stringify("Backend Docs");
  })
  .post("/", verify, async (context: RouterContext<string>) => {    
    const { request: req } = context;
    const { imgUrl } = await req.body().value;
    if(!imgUrl) return context.response.status = 400;
    const imageData = await scanImage(imgUrl);
    const imageDescription = await openAIReq(imageData);
    context.response.body = imageDescription;
  })

const app = new Application();

app.use(oakCors());
app.use(verify);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

await app.listen({ port: 8080 });