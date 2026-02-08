const FAVORITES_KEY = 'ktx_favorites';
const RECENTS_KEY = 'ktx_recents';
const ROLE_KEY = 'ktx_role';
const CHECKLIST_STATE_PREFIX = 'ktx_checklist_state_';

const normalizeEntryKey = (value) => {
    if (typeof value !== 'string') {
        return '';
    }

    // Backward compatibility: old favorites/recents stored plain protocol ids.
    if (value.includes(':')) {
        return value;
    }

    return `resource:${value}`;
};

const normalizeKeyList = (rawList) => {
    if (!Array.isArray(rawList)) {
        return [];
    }

    const normalized = rawList
        .map((value) => normalizeEntryKey(value))
        .filter(Boolean);

    return Array.from(new Set(normalized));
};

export const getFavorites = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favorites = stored ? normalizeKeyList(JSON.parse(stored)) : [];
    return favorites;
};

export const toggleFavorite = (entryKey) => {
    const normalizedKey = normalizeEntryKey(entryKey);
    if (!normalizedKey) {
        return getFavorites();
    }

    const favorites = getFavorites();
    const index = favorites.indexOf(normalizedKey);
    let newFavorites;

    if (index === -1) {
        newFavorites = [...favorites, normalizedKey];
    } else {
        newFavorites = favorites.filter((id) => id !== normalizedKey);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
};

export const isFavorite = (entryKey) => {
    const normalizedKey = normalizeEntryKey(entryKey);
    if (!normalizedKey) {
        return false;
    }

    const favorites = getFavorites();
    return favorites.includes(normalizedKey);
};

export const getRecents = () => {
    const stored = localStorage.getItem(RECENTS_KEY);
    const recents = stored ? normalizeKeyList(JSON.parse(stored)) : [];
    return recents;
};

export const addToRecents = (entryKey) => {
    const normalizedKey = normalizeEntryKey(entryKey);
    if (!normalizedKey) {
        return;
    }

    let recents = getRecents();
    // Remove if already exists to move it to top
    recents = recents.filter((id) => id !== normalizedKey);
    // Add to front
    recents.unshift(normalizedKey);
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
