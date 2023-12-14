import * as React from "react";
import { PiletApi } from "christmas-demo-app";
import { Link } from "react-router-dom";

import './style.scss';

const BrowsePage = React.lazy(() => import("./BrowsePage"));

export function setup(api: PiletApi) {
  const MovieTile = (props) => (
    <api.Extension name="movie-tile" params={props} />
  );

  const Buttons = (props) => (
    <api.Extension name="movie-buttons" params={props} />
  );

  api.registerExtension("menu", () => <Link to="/browse">Browse</Link>);

  api.registerPage("/browse", () => <BrowsePage MovieTile={MovieTile} Buttons={Buttons} />);
}
