import * as React from "react";
import { Favorite } from "./Favorite";
import { NoFavs, NoUser } from "./Messages";
import { MovieTileProps } from "../models/proptypes";
import { useFavorites } from "../hooks/useFavorites";
import { useUser } from "../hooks/useUser";

interface FavoritesProps {
  MovieTile?: React.FC<MovieTileProps>;
}

const Noop = () => null;

const Favorites: React.FC<FavoritesProps> = ({ MovieTile = Noop }) => {
  const user = useUser();
  const [favorites] = useFavorites();

  if (!user) {
    return <NoUser />;
  }

  if (!Object.keys(favorites).length) {
    return <NoFavs />;
  }

  console.log('Has favorites', favorites);

  return (
    <div className="favorites">
      {Object.entries(favorites).map(([k, v]) => (
        <Favorite key={k} id={k} media_type={v} MovieTile={MovieTile} />
      ))}
    </div>
  );
};

export default Favorites;
