import * as React from "preact/compat";
import {
  createListener,
  registerDependencies,
  registerDependencyUrls,
  PiletApi,
} from "piral-base/minimal";
import { Component } from "./Component";
import { deserializeState } from "./state";
import { createpClientSideRouter } from "./router";
import { integrateDebugTools } from "./debug";
import { createCustomElements } from "./element";

export async function initPiral() {
  const state = deserializeState();
  const events = createListener();
  const api = {
    ...events,
    Extension: Component,
  } as PiletApi;

  integrateDebugTools(events, state);

  await registerDependencies({
    react: React,
    "react@18.2.0": React,
  });

  registerDependencyUrls(state.deps);

  createCustomElements(state, api);

  createpClientSideRouter();
}
