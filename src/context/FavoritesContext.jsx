import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return savedFavorites;
    });

    const toggleFavorite = (itemId) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.includes(itemId);
            const updatedFavorites = isFavorited
                ? prevFavorites.filter(id => id !== itemId)
                : [...prevFavorites, itemId];
            
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);