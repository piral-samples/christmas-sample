import axios from "axios";
import * as React from "react";
import {
  startLoadingPilets,
  PiletRequester,
  PiletLoader,
  createEvaluatedPilet,
  Pilet,
} from "piral-base";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { makeApiCreator } from "./api";
import { normalizeCss } from "./css";
import { makeComponent } from "./extension";
import { extendSharedDependencies, handleFailure } from "./utils";
import { UserPiletContext, Registry } from "./types";

const client = readFile(resolve(__dirname, "client.js"), "utf8");

const loadPilet: PiletLoader = async (entry) => {
  if ("link" in entry) {
    const { dependencies = {}, config = {}, link, ...rest } = entry as any;
    const meta = Object.assign({ dependencies, config, link }, rest);

    extendSharedDependencies(dependencies);

    return System.import(link)
      .catch((error) => handleFailure(error, link))
      .then((app) => createEvaluatedPilet(meta, app));
  }

  return undefined;
};

type PiletContent = [
  css: Array<string>,
  js: Array<string>,
  deps: Record<string, string>,
  pilets: Array<Pilet>
];

function finishPiletLoading(notifier: ReturnType<typeof startLoadingPilets>) {
  return new Promise<PiletContent>((resolve) => {
    notifier.connect((error, pilets, loaded) => {
      if (error) {
        console.error("Could not load!", error);
      }

      if (loaded) {
        const cssLinks = pilets.flatMap((pilet) =>
          pilet.styles?.map((name) => `${pilet.basePath}${name}`)
        );
        const jsLinks = pilets.map((pilet) => pilet.link);
        const deps = pilets.reduce((obj, pilet) => {
          Object.assign(obj, pilet.dependencies);
          return obj;
        }, {});
        resolve([cssLinks, jsLinks, deps, pilets]);
      }
    });
  });
}

export async function createNewContext(
  fetchPilets: PiletRequester
): Promise<UserPiletContext> {
  const registry: Registry = {
    pages: new Map(),
    components: new Map(),
  };
  const Component = makeComponent(registry);
  const createApi = makeApiCreator(Component, registry);
  const notifier = startLoadingPilets({
    fetchPilets,
    loadPilet,
    dependencies: {
      react: React,
      "react@18.2.0": React,
    },
    createApi,
  });

  const [cssLinks, jsLinks, dependencies, pilets] = await finishPiletLoading(
    notifier
  );

  const cssContent = await Promise.all(
    cssLinks.map((link) =>
      axios.get(link).then((res) => normalizeCss(link, res.data))
    )
  ).then((parts) => parts.join("\n"));

  const jsContent = await client;

  return {
    Component,
    cssLinks,
    cssContent,
    jsLinks,
    jsContent,
    dependencies,
    pilets,
    registry,
  };
}
