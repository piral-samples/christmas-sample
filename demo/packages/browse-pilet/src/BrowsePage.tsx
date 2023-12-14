import * as React from "react";
import { BrowseProps } from "./models/proptypes";
import { Hero } from "./Hero";
import { Showcase } from "./Showcase";

import showcasesdata from "./data/showcases";
import herodata from "./data/hero";

const Noop = () => null;

const BrowsePage: React.FC<BrowseProps> = ({
  MovieTile = Noop,
  Buttons = Noop,
}) => (
  <div className="Browse">
    <Hero {...herodata}>
      <Buttons full {...herodata} />
    </Hero>
    {showcasesdata.map((data, i) => (
      <Showcase MovieTile={MovieTile || Noop} {...data} key={i} />
    ))}
  </div>
);

export default BrowsePage;
