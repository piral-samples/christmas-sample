import * as React from "react";
import { PiletApi } from "christmas-demo-app";

import './style.scss';

const ProfileExtension = React.lazy(() => import('./ProfileExtension'));
const ProfilePage = React.lazy(() => import("./ProfilePage"));

export function setup(api: PiletApi) {
  api.registerExtension("header-items", () => <ProfileExtension />);

  api.registerPage("/profile", () => <ProfilePage />);
}
