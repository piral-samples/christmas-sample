import * as React from "react";
import { PiletApi } from "christmas-demo-app";

import "./style.scss";

const SearchExtension = React.lazy(() => import("./SearchExtension"));

export function setup(api: PiletApi) {
  const MovieTile = (props) => (
    <api.Extension name="movie-tile" params={props} />
  );
  api.registerExtension("header-items", () => (
    <SearchExtension MovieTile={MovieTile} />
  ));
}
