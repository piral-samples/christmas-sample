import * as React from "react";
import { PiletApi } from "christmas-demo-app";

import "./style.scss";

const MovieTile = React.lazy(() => import("./MovieTile"));
const WatchPage = React.lazy(() => import("./WatchPage"));

export function setup(api: PiletApi) {
  const Buttons = (props) => (
    <api.Extension name="movie-buttons" params={props} />
  );

  api.registerExtension("movie-tile", ({ params }) => (
    <MovieTile {...params} Buttons={Buttons} />
  ));

  api.registerPage("/watch/:media_type/:video_id", () => <WatchPage />);
}
