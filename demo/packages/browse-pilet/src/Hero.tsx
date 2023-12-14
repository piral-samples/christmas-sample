import * as React from "react";
import { HeroProps } from "./models/proptypes";
import { HeroButton } from "./HeroButton";

export const Hero: React.FC<HeroProps> = ({
  backgroundUrl,
  logoUrl,
  title,
  text,
  media_type,
  movieId,
  children,
}) => (
  <div
    id="hero"
    className="Hero"
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
    <div className="content">
      <img className="logo" src={logoUrl} title="Logo" />
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="button-wrapper">
        <HeroButton
          primary={true}
          text="Watch Now"
          href={`/watch/${media_type}/${movieId}`}
        />
        {children}
      </div>
    </div>
    <div className="overlay" />
  </div>
);
