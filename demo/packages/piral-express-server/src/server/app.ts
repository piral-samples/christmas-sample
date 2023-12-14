import axios from "axios";
import WebSocket from "ws";
import { PiletRequester } from "piral-base";
import { createServer } from "http";
import { createMiddleware } from "@hattip/adapter-node";
import { createHandler } from "./handler";
import { events } from "./events";
import {
  defaultReconnectInterval,
  changeEvent,
  replaceEvent,
} from "./constants";
import { ComponentType } from "react";
import { PageLayoutProps } from "./types";

function connect(reconnectInterval: number, feedEvents: string) {
  const ws = new WebSocket(feedEvents, {
    perMessageDeflate: false,
  });

  ws.on("message", (buffer) => {
    const msg = JSON.parse(buffer.toString("utf8"));

    if (msg.type === "update-pilet") {
      // event from the feed service (in prod)
      events.emit(changeEvent, msg.data);
    } else if (typeof msg.type === "undefined" && msg.spec === "v3") {
      // event from the debug process (in development)
      events.emit(changeEvent, {});
      events.emit(replaceEvent, msg);
    }
  });

  ws.on("close", function () {
    // make sure to always have a WS connection => reconnect
    // automatically once the given interval (in ms) is over
    setTimeout(connect, reconnectInterval);
  });
}

function createPiletFetcher(feedUrl: string) {
  const fetchPilets: PiletRequester = async () => {
    const result = await axios.get(feedUrl);

    if ("items" in result.data) {
      return result.data.items;
    } else if (Array.isArray(result.data)) {
      return result.data;
    }

    return [];
  };

  return fetchPilets;
}

export interface ServerOptions {
  reconnectInterval?: number;
  feedEventsUrl?: string;
  feedPiletsUrl: string;
  url?: string;
  port?: number;
  host?: string;
  Layout: ComponentType<PageLayoutProps>;
}

export function runServer(options: ServerOptions) {
  const {
    reconnectInterval = defaultReconnectInterval,
    feedEventsUrl,
    feedPiletsUrl,
    Layout,
    port = 3000,
    host = "localhost",
    url = `http://${host}:${port}`,
  } = options;
  const fetcher = createPiletFetcher(feedPiletsUrl);
  const handler = createHandler({ server: url, fetcher, PageLayout: Layout });
  const middleware = createMiddleware(handler);

  createServer((req, res) =>
    middleware(req, res, () => {
      if (req.url === "/browser-refresh") {
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        const changeHandler = (data: { name: string }) => {
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        events.on(replaceEvent, changeHandler);

        res.on("close", () => {
          events.off(replaceEvent, changeHandler);
          res.end();
        });
      }
    })
  ).listen(port, () => {
    if (feedEventsUrl) {
      connect(reconnectInterval, feedEventsUrl);
    }

    console.log(`Server listening on http://${host}:${port}`);
  });
}
