import * as favoritesStore from "../store";
import { useState, useEffect, useCallback } from "react";
import { FavoriteData } from "../models/types";
import { useUser } from "./useUser";

export function useFavorites(): [
  FavoriteData,
  (favorites: FavoriteData) => void
] {
  const user = useUser();
  const getFavorites = useCallback(() => favoritesStore.get(user.userId), [user?.userId]);
  const [favorites, setFavorites] = useState(getFavorites);

  useEffect(() => {
    const handler = () => setFavorites(getFavorites);

    window.addEventListener("updated-favorites", handler);
    return () => {
      window.removeEventListener("updated-favorites", handler);
    };
  }, [getFavorites]);

  return [favorites, (fav) => favoritesStore.update(user.userId, fav)];
}
