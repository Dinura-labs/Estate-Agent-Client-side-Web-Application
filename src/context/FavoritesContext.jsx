import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // LocalStorage එකෙන් කලින් save කරපු ඒවා ගන්නවා
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('myFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites වෙනස් වෙන හැම වෙලාවෙම LocalStorage එක update කරනවා
  useEffect(() => {
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // අලුත් එකක් Add කරන්න (Duplicate වෙන්න දෙන්නේ නෑ)
  const addFavorite = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  // අයින් කරන්න
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  // ඔක්කොම මකන්න
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
