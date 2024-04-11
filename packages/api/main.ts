import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { openAIReq, scanImage } from "./controllers/index.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { userRoutes } from "./routes/user.route.ts";
config({export: true});

const router = new Router();

const verify = async (context: RouterContext<string>, next: () => Promise<unknown>) => {
  const headers: Headers = context.request.headers;
  if(headers.get("origin")==="https://ai-alt-tags.com") return await next();
  if(headers.get("origin")==="http://localhost:8000") return await next();
  if(!headers.get('AI-Alt-API-Key')||(Deno.env.get("TEMP_UUID")!==headers.get('AI-Alt-API-Key'))) return context.response.status = 401;
  await next();
}

router
  .get("/", async (context: RouterContext<string>) => {   
    console.log(context.cookies.get("token"));
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

app.use(router.routes());
app.use(router.allowedMethods());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

await app.listen({ port: 8080 });