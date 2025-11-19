const FAVORITES_KEY = 'ktx_favorites';
const RECENTS_KEY = 'ktx_recents';

export const getFavorites = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (protocolId) => {
    const favorites = getFavorites();
    const index = favorites.indexOf(protocolId);
    let newFavorites;

    if (index === -1) {
        newFavorites = [...favorites, protocolId];
    } else {
        newFavorites = favorites.filter(id => id !== protocolId);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
};

export const isFavorite = (protocolId) => {
    const favorites = getFavorites();
    return favorites.includes(protocolId);
};

export const getRecents = () => {
    const stored = localStorage.getItem(RECENTS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addToRecents = (protocolId) => {
    let recents = getRecents();
    // Remove if already exists to move it to top
    recents = recents.filter(id => id !== protocolId);
    // Add to front
    recents.unshift(protocolId);
    // Limit to 20
    if (recents.length > 20) {
        recents.pop();
    }
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
};
