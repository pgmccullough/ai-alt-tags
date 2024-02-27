import { HandlerContext } from "$fresh/server.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';
config({export: true});

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const body = { API_URL: Deno.env.get("API_URL") };
  return new Response(JSON.stringify(body));
};
