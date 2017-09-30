import {
  FILTERS,
} from '../constants';

export function addMediaType(data) {
  return {
    type: FILTERS.ADD_MEDIATYPE,
    data,
  };
}

export function addGenre(data) {
  return {
    type: FILTERS.ADD_GENRE,
    data,
  };
}

export function addLanguage(data) {
  return {
    type: FILTERS.ADD_LANGUAGE,
    data,
  };
}

export function clearFilters() {
  return {
    type: FILTERS.CLEAR_ALL_FILTERS,
  };
}


export function updateLanguage(data) {
  return {
    type: FILTERS.UPDATE_LANGUAGE,
    data,
  };
}

export function updateInitialLanguage(data) {
  return {
    type: FILTERS.UPDATE_INITIAL_LANGUAGE,
    data,
  };
}

export function resetInitialData() {
  return {
    type: FILTERS.RESET_INITIAL_LANGUAGE,
  };
}
