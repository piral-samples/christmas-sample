import { FavoriteData } from "./models/types";

const store: { favorites: Record<number, FavoriteData> } = { favorites: {} };

export function update(userId: number, newFavorites: FavoriteData) {
  store.favorites[userId] = newFavorites;
  window.dispatchEvent(
    new CustomEvent("updated-favorites", {
      detail: {
        userId,
        newFavorites,
      },
    })
  );
}

export function get(userId: number) {
  return store.favorites[userId] || {};
}
