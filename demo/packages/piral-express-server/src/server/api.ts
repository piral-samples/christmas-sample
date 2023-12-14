import * as React from "react";
import { initializeApi, PiletApiCreator } from "piral-base";
import { match } from "path-to-regexp";
import { events } from "./events";
import { getUrlFromCb } from "./utils";
import {
  Registry,
  MfComponentProps,
  RenderingOptions,
  ComponentHandler,
} from "./types";

export function makeApiCreator(
  Extension: React.ComponentType<MfComponentProps>,
  currentRegistry: Registry
): PiletApiCreator {
  return (target) => {
    const api = initializeApi(target, events);
    return Object.assign(api, {
      Extension,
      registerPage(
        path: string,
        componentLoader: () => Promise<ComponentHandler>,
        options: RenderingOptions = {}
      ) {
        const name = `page:${path}`;
        currentRegistry.pages.set(path, {
          component: name,
          matcher: match(path),
        });
        api.registerExtension(name, componentLoader, options);
      },
      unregisterPage(
        path: string,
        componentLoader: () => Promise<ComponentHandler>
      ) {
        const reference = currentRegistry.pages.get(path);

        if (reference) {
          const name = reference.component;
          currentRegistry.pages.delete(path);
          api.unregisterExtension(name, componentLoader);
        }
      },
      registerExtension(
        name: string,
        componentLoader: () => Promise<ComponentHandler>,
        options: RenderingOptions = {}
      ) {
        const { client = "load", server = "load", data = {} } = options;
        const components = currentRegistry.components.get(name) || [];
        const suffix = (components.length + 960).toString(16);
        components.push({
          id: `${name}-${suffix}`,
          api,
          client,
          server,
          data,
          origin: target.name,
          script: getUrlFromCb(target.basePath, componentLoader),
          loader: componentLoader,
        });
        currentRegistry.components.set(name, components);
      },
      unregisterExtension(
        name: string,
        componentLoader: () => Promise<ComponentHandler>
      ) {
        const components = currentRegistry.components.get(name) || [];
        const index = components.findIndex((c) => c.loader === componentLoader);

        if (index !== -1) {
          components.splice(index, 1);
        }

        if (components.length === 0) {
          currentRegistry.components.delete(name);
        }
      },
    });
  };
}
