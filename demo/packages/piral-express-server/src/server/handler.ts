import { AdapterRequestContext, HattipHandler } from "@hattip/core";
import { PiletRequester } from "piral-base";
import { ComponentType } from "react";
import { readdirSync, createReadStream } from "fs";
import { resolve } from "path";
import { Readable } from "stream";
import { loadPilets } from "./components";
import { createSessionCookie, getSessionId } from "./cookie";
import { renderFragment, renderLayout } from "./render";
import { getFragment } from "./route";
import { PageLayoutProps, SessionId, UserPiletContext } from "./types";
import { initAsyncContext } from "./request";

const wwwroot = resolve(__dirname, "wwwroot");
const files = readdirSync(wwwroot).map((m) => `/${m}`);

async function getPiletContext(
  context: AdapterRequestContext,
  fetcher: PiletRequester
): Promise<[UserPiletContext, SessionId]> {
  const sessionId = getSessionId(context.request.headers.get("cookie"));
  const piletContext = await loadPilets(sessionId.value, fetcher);
  return [piletContext, sessionId];
}

export interface HandlerOptions {
  PageLayout: ComponentType<PageLayoutProps>;
  server: string;
  fetcher: PiletRequester;
}

export function createHandler(options: HandlerOptions) {
  const { PageLayout, server, fetcher } = options;

  const handler: HattipHandler = async (context) => {
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    if (pathname === "/browser-refresh") {
      context.passThrough();
    } else if (context.request.method === "GET") {
      if (pathname.startsWith("/fragment/")) {
        const useragent = context.request.headers.get("user-agent");
        const [piletContext, sessionId] = await getPiletContext(
          context,
          fetcher
        );
        const name = Buffer.from(pathname.substring(10), "base64url").toString(
          "utf8"
        );
        const content = getFragment(name, url, piletContext);
        initAsyncContext(sessionId, piletContext, context);
        const body = await renderFragment(content, useragent, piletContext);
        return new Response(body);
      } else if (pathname === "/") {
        return Response.redirect(server + "/browse");
      } else if (files.includes(pathname)) {
        const body = createReadStream(resolve(wwwroot, pathname.substring(1)));
        return new Response(Readable.toWeb(body) as any, {
          headers: { "content-type": "text/html" },
        });
      } else {
        const useragent = context.request.headers.get("user-agent");
        const [piletContext, sessionId] = await getPiletContext(
          context,
          fetcher
        );
        const content = getFragment(`page:${pathname}`, url, piletContext);

        if (content) {
          initAsyncContext(sessionId, piletContext, context);
          const body = await renderLayout(PageLayout, content, useragent, piletContext);
          const response = new Response(body, {
            headers: { "content-type": "text/html" },
          });

          if (sessionId.renew) {
            response.headers.set(
              "set-cookie",
              createSessionCookie(sessionId.value)
            );
          }

          return response;
        }
      }
    }

    return new Response("Not found.", { status: 404 });
  };

  return handler;
}
