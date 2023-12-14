import * as React from "react";
import * as userStore from "./store";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const logout = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    userStore.update(null);
    navigate("/");
  };

  return (
    <form method="POST" action="/" onSubmit={logout}>
      <input type="hidden" name="store" value="user" />
      <input type="hidden" name="user" value="null" />
      <button className="logout">Log out</button>
    </form>
  );
};
