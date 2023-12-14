import { User } from "./models/types";

const store: { user: User | null } = { user: null };

export function update(newUser: User | null) {
  store.user = newUser;
  window.dispatchEvent(new CustomEvent("updated-user", { detail: newUser }));
}

export function get() {
  return store;
}
