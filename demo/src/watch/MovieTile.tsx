import * as React from "react";
import { Link } from "react-router-dom";

interface MovieData {
  backdrop: string;
  title: string;
  score: string;
  overview: string;
  movieId: string;
  media_type: "tv" | "movie";
}

interface MovieTileProps extends MovieData {
  Buttons?: React.ComponentType<MovieData>;
}

const Noop = () => null;

const MovieTile: React.FC<MovieTileProps> = ({ Buttons = Noop, ...params }) => {
  const { backdrop, movieId, media_type, title, score, overview } = params;
  const backDrop = backdrop.match(/.*(null|undefined)$/)
    ? "https://i.imgur.com/QVaMho2.png"
    : backdrop;

  return (
    <div
      className="MovieTile"
      id={movieId}
      data-mediatype={media_type}
      style={{ backgroundImage: `url(${backDrop})` }}
    >
      <div className="overlay">
        <Link to={`/watch/${media_type}/${movieId}`}>
          <div className="title">{title}</div>
          <div className="rating">{score} / 10</div>
          <div className="plot">{overview}</div>
        </Link>
        <Buttons {...params} />
      </div>
    </div>
  );
};

export default MovieTile;
