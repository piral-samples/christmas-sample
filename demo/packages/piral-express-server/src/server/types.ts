import { PiletApi, PiletMetadata } from "piral-base";
import { ComponentType, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MfComponentProps {
  name: string;
  params?: any;
  rel?: 'router';
  render?(nodes: Array<ReactNode>): ReactNode;
}

export type ClientRendering =
  | "none"
  | "visible"
  | "load"
  | "idle"
  | `media=${string}`;

export type ServerRendering = "none" | "load";

export interface RenderingOptions {
  client?: ClientRendering;
  server?: ServerRendering;
  data?: Record<string, () => Promise<any>>;
}

declare module "piral-base/lib/types/runtime" {
  interface PiletApi {
    registerExtension(
      name: string,
      loader: () => Promise<ComponentHandler>,
      options?: RenderingOptions
    ): void;
    unregisterExtension(
      name: string,
      loader: () => Promise<ComponentHandler>
    ): void;
    registerPage(
      name: string,
      loader: () => Promise<ComponentHandler>,
      options?: RenderingOptions
    ): void;
    unregisterPage(name: string, loader: () => Promise<ComponentHandler>): void;
    Extension: ComponentType<MfComponentProps>;
  }

  interface PiletMetadata {
    styles?: Array<string>;
  }
}

interface PiralComponentProps extends HTMLAttributes<{}> {
  cid: string;
  origin: string;
  data: string;
  group: string;
}

interface PiralSlotProps extends HTMLAttributes<{}> {
  name: string;
  group: string;
  params: string;
  rel?: string;
}

export interface PageLayoutProps {
  context: UserPiletContext;
  children: ReactNode;
  script: ReactNode;
  style: ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "piral-component": DetailedHTMLProps<PiralComponentProps, {}>;
      "piral-slot": DetailedHTMLProps<PiralSlotProps, {}>;
    }
  }

  interface HTMLElementTagNameMap {
    "piral-component": HTMLElement & {
      cid: string;
      origin: string;
      data: string;
      group: string;
    };
    "piral-slot": HTMLElement & {
      name: string;
      group: string;
      params: string;
    };
  }
}

export interface ComponentReference {
  id: string;
  api: PiletApi;
  script: string;
  origin: string;
  client: ClientRendering;
  server: ServerRendering;
  data: Record<string, () => Promise<any>>;
  loader: () => Promise<ComponentHandler>;
}

export interface ComponentHandler {
  default: ComponentType;
}

export interface EndpointHandler {
  matcher(path: string): false | { params: Record<string, string> };
  GET?(context: Request, params: Record<string, string>): Promise<Response>;
  PUT?(context: Request, params: Record<string, string>): Promise<Response>;
  POST?(context: Request, params: Record<string, string>): Promise<Response>;
  PATCH?(context: Request, params: Record<string, string>): Promise<Response>;
  DELETE?(context: Request, params: Record<string, string>): Promise<Response>;
}

export interface PageReference {
  component: string;
  matcher(path: string): false | { params: Record<string, string> };
}

export interface SessionId {
  renew: boolean;
  value: string;
}

export interface Registry {
  pages: Map<string, PageReference>;
  components: Map<string, Array<ComponentReference>>;
}

export interface UserPiletContext {
  Component: ComponentType<MfComponentProps>;
  cssLinks: Array<string>;
  cssContent: string;
  jsLinks: Array<string>;
  jsContent: string;
  dependencies: Record<string, string>;
  pilets: Array<PiletMetadata>;
  registry: Registry;
}

export interface PiletContext {
  cssLinks: Array<string>;
  cssContent: string;
  jsLinks: Array<string>;
  jsContent: string;
  dependencies: Record<string, string>;
  pilets: Array<PiletMetadata>;
}

export interface StateContext {
  Component: ComponentType<MfComponentProps>;
  registry: Registry;
  piletsRef: string;
}
