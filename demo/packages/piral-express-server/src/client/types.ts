import type { PiletMetadata } from "piral-base";
import type { ClientRendering, ServerRendering } from "../server/types";

export interface ComponentReference {
  client: ClientRendering;
  server: ServerRendering;
  script: string;
  origin: string;
}

export interface PiralClientState {
  components: Record<string, ComponentReference>;
  js: Array<string>;
  deps: Record<string, string>;
  pilets: Array<PiletMetadata>;
}
