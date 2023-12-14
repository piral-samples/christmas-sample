import { useState, useEffect } from "react";
import { User } from "../models/types";

let currentUser: User | null = null;

window.addEventListener("updated-user", (ev: CustomEvent) => {
  currentUser = ev.detail;
});

export function useUser(): User {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const handler = (ev: CustomEvent) => setUser(ev.detail);

    window.addEventListener("updated-user", handler);
    return () => {
      window.removeEventListener("updated-user", handler);
    };
  }, []);

  return user;
}
