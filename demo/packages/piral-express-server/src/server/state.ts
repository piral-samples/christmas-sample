import { ComponentReference, UserPiletContext } from "./types";

function componentsToObj(components: Array<ComponentReference>) {
  return Object.fromEntries(
    components.map((c) => [
      c.id,
      {
        script: c.script,
        origin: c.origin,
        client: c.client,
        server: c.server,
      },
    ])
  );
}

export function serializePartialState(
  usedComponents: Array<ComponentReference>
) {
  return JSON.stringify({
    components: componentsToObj(usedComponents),
  });
}

export function serializeState(
  context: UserPiletContext,
  usedComponents: Array<ComponentReference>
) {
  return JSON.stringify({
    deps: context.dependencies,
    components: componentsToObj(usedComponents),
    pilets: context.pilets.map((pilet) => ({
      name: pilet.name,
      version: pilet.version,
      spec: pilet.spec,
      link: pilet.link,
      dependencies: pilet.dependencies,
      basePath: pilet.basePath,
    })),
  });
}
