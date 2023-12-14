import * as React from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useUser } from "../hooks/useUser";

interface FavoriteToggleProps {
  movieId: string;
  media_type: "tv" | "movie";
  full?: boolean;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  movieId,
  media_type,
  full,
}) => {
  const user = useUser();
  const [favorites, setFavorites] = useFavorites();

  const toggle = React.useCallback(() => {
    const { [movieId]: current, ...rest } = favorites;
    if (current) {
      setFavorites(rest);
    } else {
      setFavorites({ ...rest, [movieId]: media_type });
    }
  }, [favorites]);

  const icons = (
    <div>
      <i className="fa fa-fw fa-heart" />
      <i className="fa fa-fw fa-check" />
    </div>
  );

  if (!user) {
    return <></>;
  } else if (!full) {
    return (
      <div
        onClick={toggle}
        data-toggled={`${!!favorites[movieId]}`}
        className="ListToggle"
      >
        {icons}
      </div>
    );
  } else {
    return (
      <div
        onClick={toggle}
        className="Button favorite-toggle-full"
        data-primary={false}
        data-toggled={`${!!favorites[movieId]}`}
      >
        {icons}
        Add to favorites
      </div>
    );
  }
};

export default FavoriteToggle;
