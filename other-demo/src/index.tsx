import * as React from "react";
import type { PiletApi } from "christmas-demo-app";

import "./style.scss";

const Menu = React.lazy(() => import("./components/Menu"));
const Favorites = React.lazy(() => import("./components/Favorites"));
const FavoriteToggle = React.lazy(() => import("./components/FavoriteToggle"));

export function setup(api: PiletApi) {
  const MovieTile = (props) => (
    <api.Extension name="movie-tile" params={props} />
  );

  api.registerPage("/favorites", () => (
    <Favorites MovieTile={MovieTile} />
  ));

  api.registerExtension("menu", () => <Menu />);

  api.registerExtension("movie-buttons", ({ params }) => (
    <FavoriteToggle {...params} />
  ));
}
