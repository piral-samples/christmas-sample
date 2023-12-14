import type { ComponentType } from "react";

export interface MovieData {
  backdrop: string;
  title: string;
  score: string;
  overview: string;
  movieId: string;
  media_type: "tv" | "movie";
}

export interface MovieTileProps extends MovieData {
  Buttons?: ComponentType<MovieData>;
}
