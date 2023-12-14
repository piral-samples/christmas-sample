import { PiralClientState } from "./types";

export function deserializeState() {
  // we obtain the serialized state
  const element = document.querySelector("script[type=piral-state]");

  if (element) {
    const state = JSON.parse(element.textContent);
    element.remove();
    return state;
  }

  return {};
}

export function patchState(state: PiralClientState) {
  const patch = deserializeState() as Partial<PiralClientState>;
  Object.assign(state.components, patch.components);
}
