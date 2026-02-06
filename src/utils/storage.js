const FAVORITES_KEY = 'ktx_favorites';
const RECENTS_KEY = 'ktx_recents';
const ROLE_KEY = 'ktx_role';
const CHECKLIST_STATE_PREFIX = 'ktx_checklist_state_';

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

export const getRole = (defaultRoleId) => {
    const stored = localStorage.getItem(ROLE_KEY);
    return stored || defaultRoleId;
};

export const setRole = (roleId) => {
    localStorage.setItem(ROLE_KEY, roleId);
};

export const getChecklistState = (checklistId) => {
    const stored = localStorage.getItem(`${CHECKLIST_STATE_PREFIX}${checklistId}`);
    return stored ? JSON.parse(stored) : [];
};

export const setChecklistState = (checklistId, state) => {
    localStorage.setItem(`${CHECKLIST_STATE_PREFIX}${checklistId}`, JSON.stringify(state));
};

export const clearChecklistState = (checklistId) => {
    localStorage.removeItem(`${CHECKLIST_STATE_PREFIX}${checklistId}`);
};
