import * as React from "react";
import MovieTile from "../watch/MovieTile";
import SearchExtension from "../search/SearchExtension";
import ProfileExtension from "../profile/ProfileExtension";

const HeaderItems: React.FC = () => {
  return (
    <>
      <SearchExtension MovieTile={MovieTile} />
      <ProfileExtension />
    </>
  );
};

export default HeaderItems;
