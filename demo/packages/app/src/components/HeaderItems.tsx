import * as React from "react";
import { MovieTile } from "christmas-demo-watch";
import { SearchExtension } from "christmas-demo-search";
import { ProfileExtension } from "christmas-demo-profile";

const HeaderItems: React.FC = () => {
  return (
    <>
      <SearchExtension MovieTile={MovieTile} />
      <ProfileExtension />
    </>
  );
};

export default HeaderItems;
